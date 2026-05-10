const ORDEN = ['oficial', 'blue', 'bolsa', 'contadoconliqui', 'cripto', 'tarjeta']

// SVGs personalizados estilo Vercel para cada tipo
const ICONOS = {
    oficial: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 13.5h14"/>
        <path d="M0.5 6.5h14"/>
        <path d="M7.5 1L14.5 6.5H0.5L7.5 1Z"/>
        <line x1="2.5" y1="6.5" x2="2.5" y2="13.5"/>
        <line x1="5.5" y1="6.5" x2="5.5" y2="13.5"/>
        <line x1="9.5" y1="6.5" x2="9.5" y2="13.5"/>
        <line x1="12.5" y1="6.5" x2="12.5" y2="13.5"/>
    </svg>`,

    blue: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <polyline points="0.5 12 4.5 7.5 7.5 10 12 3.5"/>
        <polyline points="9.5 3.5 12 3.5 12 6"/>
        <line x1="0.5" y1="14" x2="14.5" y2="14"/>
    </svg>`,

    bolsa: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="9" width="3" height="5" rx="0.5"/>
        <rect x="6" y="5.5" width="3" height="8.5" rx="0.5"/>
        <rect x="11" y="2" width="3" height="12" rx="0.5"/>
        <line x1="1" y1="6.5" x2="2.5" y2="5" x2="2.5" y2="5"/>
        <polyline points="1 7 3 5.5 6 7.5 9 4.5 12 3"/>
    </svg>`,

    contadoconliqui: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7.5" cy="7.5" r="6.5"/>
        <line x1="1" y1="7.5" x2="14" y2="7.5"/>
        <path d="M7.5 1C5.2 2.8 3.8 5 3.8 7.5S5.2 12.2 7.5 14"/>
        <path d="M7.5 1C9.8 2.8 11.2 5 11.2 7.5S9.8 12.2 7.5 14"/>
    </svg>`,

    cripto: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0.5 L14 4.25 L14 10.75 L7.5 14.5 L1 10.75 L1 4.25 Z"/>
        <path d="M6 4.5 H8.8 C9.7 4.5 10.4 5.1 10.4 6 C10.4 6.9 9.7 7.5 8.8 7.5 H6"/>
        <path d="M6 7.5 H9.1 C10.1 7.5 10.9 8.1 10.9 9.1 C10.9 10.1 10.1 10.7 9.1 10.7 H6"/>
        <line x1="6" y1="4" x2="6" y2="11.2"/>
        <line x1="7.8" y1="4" x2="7.8" y2="4.5"/>
        <line x1="7.8" y1="11.2" x2="7.8" y2="10.7"/>
    </svg>`,

    tarjeta: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="3" width="14" height="9.5" rx="1.5"/>
        <line x1="0.5" y1="6.5" x2="14.5" y2="6.5"/>
        <line x1="2.5" y1="10" x2="5.5" y2="10"/>
        <line x1="7" y1="10" x2="8.5" y2="10"/>
        <rect x="2.5" y="8.5" width="3" height="2" rx="0.5" stroke="none" fill="currentColor" opacity="0.25"/>
    </svg>`,
}

// Color e ícono correcto para cada tarjeta
const DATOSCARDS = {
    oficial: { label: 'Oficial', icon: ICONOS.oficial, fg: '#60a5fa', bg: 'rgba(29,111,163,0.12)', border: 'rgba(29,111,163,0.3)' },
    blue: { label: 'Blue', icon: ICONOS.blue, fg: '#f87171', bg: 'rgba(139,21,53,0.12)', border: 'rgba(139,21,53,0.35)' },
    bolsa: { label: 'MEP', icon: ICONOS.bolsa, fg: '#fbbf24', bg: 'rgba(176,125,32,0.12)', border: 'rgba(176,125,32,0.3)' },
    contadoconliqui: { label: 'CCL', icon: ICONOS.contadoconliqui, fg: '#4ade80', bg: 'rgba(26,122,74,0.12)', border: 'rgba(26,122,74,0.3)' },
    cripto: { label: 'Cripto', icon: ICONOS.cripto, fg: '#fb923c', bg: 'rgba(234,108,10,0.12)', border: 'rgba(234, 107, 10, 0.25)' },
    tarjeta: { label: 'Tarjeta', icon: ICONOS.tarjeta, fg: '#a78bfa', bg: 'rgba(102,66,166,0.12)', border: 'rgba(102,66,166,0.3)' },
}

let datosAPI = []
let modo = 'ars' // 'ars' = pesos->usd  |  'usd' = usd->pesos

// Formateadores de moneda
const fmt = val => val != null ? '$\u202f' + val.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '\u2014'
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
                <span class="card-icon" style="color:${dc.fg}">${dc.icon}</span>
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

    if (!valor || valor <= 0 || !datosAPI.length) {
        contenedor.innerHTML = ''
        return
    }

    const items = ORDEN.map(c => datosAPI.find(d => d.casa === c)).filter(Boolean)

    if (modo === 'ars') {
        // ARS -> USD: divido por precio de venta (cuanto vale comprar 1 USD)
        contenedor.innerHTML = items.filter(d => d.venta).map(item => {
            const dc = DATOSCARDS[item.casa]

            return '<div class="conv-item">' +
                '<div class="conv-label" style="color:' + dc.fg + '">' + dc.label + '</div>' +
                '<div class="conv-amount">' + fmtUS(valor / item.venta) + '</div>' +
                '<div class="conv-rate">a ' + fmt(item.venta) + '</div>' +
                '</div>'
        }).join('')
    } else {
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