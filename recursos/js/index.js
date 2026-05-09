const ORDEN = ['oficial', 'blue', 'bolsa', 'contadoconliqui', 'cripto', 'tarjeta']

// Color e ícono correcto para cada tarjeta
const DATOSCARDS = {
    oficial:         { label: 'Oficial', icon: '🏦', fg: '#60a5fa', bg: 'rgba(29,111,163,0.12)',  border: 'rgba(29,111,163,0.3)'  },
    blue:            { label: 'Blue',    icon: '📈', fg: '#f87171', bg: 'rgba(139,21,53,0.12)',   border: 'rgba(139,21,53,0.35)'  },
    bolsa:           { label: 'MEP',     icon: '📊', fg: '#fbbf24', bg: 'rgba(176,125,32,0.12)',  border: 'rgba(176,125,32,0.3)'  },
    contadoconliqui: { label: 'CCL',     icon: '🌐', fg: '#4ade80', bg: 'rgba(26,122,74,0.12)',   border: 'rgba(26,122,74,0.3)'   },
    cripto:          { label: 'Cripto',  icon: '🪙',  fg: '#fb923c', bg: 'rgba(234,108,10,0.12)', border: 'rgba(234, 107, 10, 0.25)' },
    tarjeta:         { label: 'Tarjeta', icon: '💳', fg: '#a78bfa', bg: 'rgba(102,66,166,0.12)',  border: 'rgba(102,66,166,0.3)'  },
}

let datosAPI = []
let modo = 'ars' // 'ars' = pesos->usd  |  'usd' = usd->pesos

// Formateadores de moneda
const fmt = val => val != null ? '$\u202f' + Math.round(val).toLocaleString('es-AR') : '\u2014'
const fmtUS = val => 'US$\u202f' + val.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

async function cargarDatos() {
    setCarga(true)
    const errBar = document.getElementById('error-bar')
    try {
        const respuestaAPI = await fetch('https://dolarapi.com/v1/dolares', { signal: AbortSignal.timeout(6000) })
        if (!respuestaAPI.ok) throw new Error('HTTP ' + respuestaAPI.status)
        datosAPI = await respuestaAPI.json()
        errBar.style.display = 'none'
        document.getElementById('last-update').textContent = 'Actualizado ' + new Date().toLocaleTimeString('es-AR', { hour12: false })
        renderCards(datosAPI)
    } catch (error) {
        errBar.style.display = 'block'
        document.getElementById('last-update').textContent = 'Error API ' + new Date().toLocaleTimeString('es-AR', { hour12: false })
        document.getElementById('cards-grid').innerHTML = 
            `
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
            `
        console.log(error)
    }
    setCarga(false)
    convertir()
}

// Prende o apaga la animación del botón "Actualizar"
function setCarga(on) {
    const btn = document.getElementById('refresh-btn')
    const ico = document.getElementById('refresh-icon')
    btn.disabled = on;
    ico.style.animation = on ? 'spin 0.7s linear infinite' : ''
}

// Maneja la UI de los botones del conversor
function setModo(m) {
    modo = m
    const label = document.getElementById('conv-currency-label')
    const hint = document.getElementById('conv-hint-text')
    const note = document.getElementById('conv-note')
    const input = document.getElementById('conv-input')

    if (m === 'ars') {
        label.textContent = '$ARS'
        label.classList.remove('usd')
        hint.textContent = 'cuanto es en US$?'
        note.style.display = 'none'
        input.placeholder = '10.000'
    } else {
        label.textContent = 'US$'
        label.classList.add('usd')
        hint.textContent = 'cuanto es en $ARS?'
        note.style.display = 'flex'
        input.placeholder = '100'
    }

    document.getElementById('btn-ars').classList.toggle('active', m === 'ars')
    document.getElementById('btn-usd').classList.toggle('active', m === 'usd')
    input.value = ''
    document.getElementById('conv-results').innerHTML = ''
}

function construirCard(item) {
    const dc = DATOSCARDS[item.casa]
    const margen = item.compra && item.venta
        ? 'margen ' + ((item.venta - item.compra) / item.compra * 100).toFixed(1) + '%'
        : ''
    const card = document.createElement('div')
    card.className = 'tipo-card'
    card.style.borderColor = dc.border
    card.innerHTML =
        `
            <div class="card-top">
                <span class="card-badge" style="color:${dc.fg}; background:${dc.bg}; border-color:${dc.border}">${dc.label}</span>
                <span class="card-icon">${dc.icon}</span>
            </div>
            <div class="card-venta-label">Venta</div>
            <div class="card-venta" style="color:${dc.fg}">${fmt(item.venta)}</div>
            <div class="card-compra">Compra: ${fmt(item.compra)}</div>
            ${(margen ? `<div class="card-margen">${margen}</div>` : '')}
        `
    return card
}

function renderCards(datos) {
    const grid = document.getElementById('cards-grid')
    grid.innerHTML = ''
    ORDEN.map(c => datos.find(d => d.casa === c)).filter(Boolean)
        .forEach(item => grid.appendChild(construirCard(item)))
}

function convertir() {
    const valor = parseFloat(document.getElementById('conv-input').value)
    const contenedor = document.getElementById('conv-results')

    if(!valor || valor <= 0 || !datosAPI.length){
        contenedor.innerHTML = ''
        return
    }

    const items = ORDEN.map(c => datosAPI.find(d => d.casa === c)).filter(Boolean)
    
    if(modo === 'ars'){
        // ARS -> USD: divido por precio de venta (cuanto vale comprar 1 USD)
        contenedor.innerHTML = items.filter(d => d.venta).map(item => {
            const dc = DATOSCARDS[item.casa]

            return '<div class="conv-item">' +
                '<div class="conv-label" style="color:' + dc.fg + '">' + dc.label + '</div>' +
                '<div class="conv-amount">' + fmtUS(valor / item.venta) + '</div>' +
                '<div class="conv-rate">a ' + fmt(item.venta) + '</div>' +
                '</div>'
        }).join('')
    }else {
        // USD -> ARS: multiplico por precio de compra (cuanto pagan por 1 USD)
        // EXCEPCIÓN: Si es 'tarjeta', uso el de venta (para calcular gastos tipo Steam)
        contenedor.innerHTML = items.map(item => {
            const dc = DATOSCARDS[item.casa]
            const precioUsado = item.casa === 'tarjeta' ? item.venta : item.compra
            
            if (!precioUsado) return ''

            return '<div class="conv-item">' +
                '<div class="conv-label" style="color:' + dc.fg + '">' + dc.label + '</div>' +
                '<div class="conv-amount">' + fmt(valor * precioUsado) + '</div>' +
                '<div class="conv-rate">a ' + fmt(precioUsado) + '</div>' +
                '</div>'
        }).join('')
    }
}

// Inicialización de la app
cargarDatos()
setInterval(cargarDatos, 60000)