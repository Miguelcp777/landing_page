/**
 * Chat panel. Talks to /api/chat on this same origin — a Cloudflare Worker sits
 * on that route and holds the API key, so nothing secret reaches the browser.
 *
 * Vanilla, like the rest of the site: no build step, no framework, no bundle.
 */
(function () {
    'use strict';

    var ENDPOINT = '/api/chat';
    var STORE = 'chat-history';
    var MAX_TURNS = 24;

    var COPY = {
        en: {
            open: 'Ask me about my experience',
            title: 'Ask Miguel',
            // ADR-0001: this label is the primary disclosure, not decoration.
            // The first person is only legitimate while it is visible. Do not
            // remove it, shorten away the word "AI", or hide it on small screens.
            note: 'AI assistant · answers in Miguel\'s voice, from his CV',
            placeholder: 'Ask me anything…',
            inputLabel: 'Ask me about my experience, tools or projects',
            send: 'Send',
            close: 'Close chat',
            clear: 'New conversation',
            thinking: 'Thinking…',
            starters: [
                'What data tools do you actually use?',
                'Tell me about the install base project',
                'Why move from service into data?'
            ],
            errors: {
                rate_limited: 'You have reached the message limit for today. Email miguelcp777@gmail.com and I will reply myself.',
                busy_today: 'This assistant has hit its daily budget. Try again tomorrow, or email miguelcp777@gmail.com — that always reaches me.',
                month_exhausted: 'This assistant has used up its budget for this month. Email miguelcp777@gmail.com and I will answer you myself.',
                generic: 'Something went wrong at my end. Try again, or email miguelcp777@gmail.com.'
            }
        },
        es: {
            open: 'Pregúntame por mi experiencia',
            title: 'Pregunta a Miguel',
            // Ver la nota en la versión EN: esta etiqueta es la divulgación, no un adorno.
            note: 'Asistente IA · respondo con la voz y el CV de Miguel',
            placeholder: 'Pregúntame lo que quieras…',
            inputLabel: 'Pregúntame por mi experiencia, herramientas o proyectos',
            send: 'Enviar',
            close: 'Cerrar el chat',
            clear: 'Nueva conversación',
            thinking: 'Pensando…',
            starters: [
                '¿Qué herramientas de datos usas de verdad?',
                'Cuéntame el proyecto de install base',
                '¿Por qué pasar de servicio técnico a datos?'
            ],
            errors: {
                rate_limited: 'Has llegado al límite de mensajes por hoy. Escríbeme a miguelcp777@gmail.com y te contesto en persona.',
                busy_today: 'Este asistente ha agotado su presupuesto diario. Vuelve mañana o escríbeme a miguelcp777@gmail.com, eso siempre me llega.',
                month_exhausted: 'Este asistente ha agotado su presupuesto de este mes. Escríbeme a miguelcp777@gmail.com y te contesto en persona.',
                generic: 'Algo ha fallado por mi parte. Inténtalo otra vez o escríbeme a miguelcp777@gmail.com.'
            }
        }
    };

    function lang() {
        try {
            return localStorage.getItem('site-lang') === 'es' ? 'es' : 'en';
        } catch (_) {
            return 'en';
        }
    }
    function t() { return COPY[lang()]; }

    var history = [];
    var busy = false;
    var els = {};

    try {
        var saved = sessionStorage.getItem(STORE);
        if (saved) history = JSON.parse(saved) || [];
    } catch (_) {}

    function persist() {
        try { sessionStorage.setItem(STORE, JSON.stringify(history)); } catch (_) {}
    }

    /* ------------------------------------------------------------- markup */

    function build() {
        var root = document.createElement('div');
        root.className = 'chat';
        root.innerHTML =
            '<button class="chat__launcher" type="button" aria-expanded="false" aria-controls="chat-panel">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
                    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
                '</svg>' +
                '<span class="chat__launcher-text"></span>' +
            '</button>' +
            '<div class="chat__panel" id="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title" hidden>' +
                '<header class="chat__head">' +
                    '<div>' +
                        '<p class="chat__title" id="chat-title"></p>' +
                        '<p class="chat__note"></p>' +
                    '</div>' +
                    '<button class="chat__icon-btn chat__clear" type="button"></button>' +
                    '<button class="chat__icon-btn chat__close" type="button">&times;</button>' +
                '</header>' +
                '<div class="chat__log" role="log" aria-live="polite" aria-atomic="false"></div>' +
                '<div class="chat__starters"></div>' +
                '<form class="chat__form">' +
                    '<label class="visually-hidden" for="chat-input"></label>' +
                    '<textarea class="chat__input" id="chat-input" rows="1" maxlength="1500"></textarea>' +
                    '<button class="chat__send" type="submit"></button>' +
                '</form>' +
            '</div>';
        document.body.appendChild(root);

        els.root = root;
        els.launcher = root.querySelector('.chat__launcher');
        els.launcherText = root.querySelector('.chat__launcher-text');
        els.panel = root.querySelector('.chat__panel');
        els.title = root.querySelector('.chat__title');
        els.note = root.querySelector('.chat__note');
        els.clear = root.querySelector('.chat__clear');
        els.close = root.querySelector('.chat__close');
        els.log = root.querySelector('.chat__log');
        els.starters = root.querySelector('.chat__starters');
        els.form = root.querySelector('.chat__form');
        els.label = root.querySelector('label[for="chat-input"]');
        els.input = root.querySelector('.chat__input');
        els.send = root.querySelector('.chat__send');
    }

    function applyLanguage() {
        var c = t();
        els.launcherText.textContent = c.open;
        els.launcher.setAttribute('aria-label', c.open);
        els.title.textContent = c.title;
        els.note.textContent = c.note;
        els.close.setAttribute('aria-label', c.close);
        els.close.title = c.close;
        els.clear.setAttribute('aria-label', c.clear);
        els.clear.title = c.clear;
        els.clear.textContent = '⟲';
        els.input.placeholder = c.placeholder;
        els.label.textContent = c.inputLabel;
        els.input.setAttribute('aria-label', c.inputLabel);
        els.send.textContent = c.send;
        renderStarters();
    }

    function renderStarters() {
        els.starters.textContent = '';
        if (history.length) return;
        t().starters.forEach(function (q) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'chat__starter';
            b.textContent = q;
            b.addEventListener('click', function () { submit(q); });
            els.starters.appendChild(b);
        });
    }

    /* ------------------------------------------------------------ message */

    // textContent throughout: model output is never parsed as HTML.
    function bubble(role, text) {
        var el = document.createElement('div');
        el.className = 'chat__msg chat__msg--' + role;
        el.textContent = text || '';
        els.log.appendChild(el);
        scroll();
        return el;
    }

    function scroll() { els.log.scrollTop = els.log.scrollHeight; }

    function render() {
        els.log.textContent = '';
        history.forEach(function (m) { bubble(m.role === 'user' ? 'user' : 'bot', m.content); });
        renderStarters();
    }

    function setBusy(state) {
        busy = state;
        els.send.disabled = state;
        els.input.disabled = state;
    }

    function submit(text) {
        text = (text || '').trim();
        if (!text || busy) return;

        history.push({ role: 'user', content: text });
        if (history.length > MAX_TURNS) history = history.slice(-MAX_TURNS);
        bubble('user', text);
        els.starters.textContent = '';
        els.input.value = '';
        els.input.style.height = 'auto';
        persist();

        var out = bubble('bot', '');
        out.classList.add('is-streaming');
        out.textContent = t().thinking;
        setBusy(true);

        stream(out).catch(function () {
            out.classList.remove('is-streaming');
            out.textContent = t().errors.generic;
        }).then(function () {
            setBusy(false);
            els.input.focus();
        });
    }

    async function stream(out) {
        var res;
        try {
            res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ messages: history })
            });
        } catch (_) {
            out.classList.remove('is-streaming');
            out.textContent = t().errors.generic;
            return;
        }

        if (!res.ok || !res.body) {
            var code = 'generic';
            try { code = (await res.json()).error || 'generic'; } catch (_) {}
            out.classList.remove('is-streaming');
            out.textContent = t().errors[code] || t().errors.generic;
            return;
        }

        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buffer = '';
        var answer = '';
        var first = true;

        while (true) {
            var chunk = await reader.read();
            if (chunk.done) break;
            buffer += decoder.decode(chunk.value, { stream: true });

            var frames = buffer.split('\n\n');
            buffer = frames.pop();

            for (var i = 0; i < frames.length; i++) {
                var line = frames[i].trim();
                if (line.indexOf('data:') !== 0) continue;
                var data;
                try { data = JSON.parse(line.slice(5).trim()); } catch (_) { continue; }

                if (data.error) {
                    out.classList.remove('is-streaming');
                    out.textContent = t().errors.generic;
                    return;
                }
                if (data.t) {
                    if (first) { out.textContent = ''; first = false; }
                    answer += data.t;
                    out.textContent = answer;
                    scroll();
                }
            }
        }

        out.classList.remove('is-streaming');
        if (!answer) { out.textContent = t().errors.generic; return; }

        history.push({ role: 'assistant', content: answer });
        if (history.length > MAX_TURNS) history = history.slice(-MAX_TURNS);
        persist();
    }

    /* -------------------------------------------------------------- panel */

    function open() {
        els.panel.hidden = false;
        els.root.classList.add('is-open');
        els.launcher.setAttribute('aria-expanded', 'true');
        els.input.focus();
        scroll();
    }

    function close() {
        els.panel.hidden = true;
        els.root.classList.remove('is-open');
        els.launcher.setAttribute('aria-expanded', 'false');
        els.launcher.focus();
    }

    function init() {
        // Off until the Worker is deployed: without /api/chat every message would
        // fail, and a visibly broken widget is worse than no widget. Turn it on
        // with data-chat="on" on <body>.
        if (document.body.getAttribute('data-chat') !== 'on') return;

        build();
        applyLanguage();
        render();

        els.launcher.addEventListener('click', function () {
            els.panel.hidden ? open() : close();
        });
        els.close.addEventListener('click', close);

        els.clear.addEventListener('click', function () {
            history = [];
            persist();
            render();
            els.input.focus();
        });

        els.form.addEventListener('submit', function (e) {
            e.preventDefault();
            submit(els.input.value);
        });

        // Enter sends, Shift+Enter breaks the line — the convention everywhere else.
        els.input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit(els.input.value);
            }
        });

        els.input.addEventListener('input', function () {
            els.input.style.height = 'auto';
            els.input.style.height = Math.min(els.input.scrollHeight, 120) + 'px';
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !els.panel.hidden) close();
        });

        // The language toggle rewrites the <html lang> attribute; follow it.
        new MutationObserver(applyLanguage).observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
