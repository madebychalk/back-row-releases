// Ambient dust motes drifting through the hero, like a back-row theater shaft
// of light catching airborne particles. Pure canvas, no dependencies.
(() => {
    const canvas = document.querySelector(".motes");
    if (!canvas) return;

    // Honor user motion preferences.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const ctx = canvas.getContext("2d");

    // Tunable knobs.
    const COUNT = 90;          // population density
    const MAX_SIZE = 2;        // px radius cap (matches the "size: 2" feel)
    const MAX_SPEED = 0.35;    // drift velocity per frame (slow ambient float)
    const MAX_ALPHA = 0.55;    // peak brightness — keep low for "subtle"
    const COLOR = "233, 218, 255"; // RGB of --fg lavender

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let rafId = null;

    function size() {
        const rect = canvas.getBoundingClientRect();
        dpr = window.devicePixelRatio || 1;
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
        particles = Array.from({ length: COUNT }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            // Bias drift slightly upward — feels like rising dust.
            vx: (Math.random() - 0.5) * MAX_SPEED,
            vy: (Math.random() - 0.7) * MAX_SPEED,
            r: Math.random() * MAX_SIZE + 0.4,
            // Each mote twinkles at its own phase so the field never pulses in sync.
            baseAlpha: Math.random() * MAX_ALPHA * 0.7 + 0.1,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.005 + Math.random() * 0.015,
        }));
    }

    function frame() {
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.twinkle += p.twinkleSpeed;

            // Wrap around the canvas edges so the field is endless.
            if (p.x < -p.r) p.x = width + p.r;
            else if (p.x > width + p.r) p.x = -p.r;
            if (p.y < -p.r) p.y = height + p.r;
            else if (p.y > height + p.r) p.y = -p.r;

            const alpha = p.baseAlpha * (0.55 + 0.45 * Math.sin(p.twinkle));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${COLOR}, ${alpha})`;
            ctx.fill();
        }

        rafId = requestAnimationFrame(frame);
    }

    function start() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(frame);
    }

    function stop() {
        if (rafId === null) return;
        cancelAnimationFrame(rafId);
        rafId = null;
    }

    // Pause the animation when the tab is hidden so we don't churn battery.
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stop();
        else start();
    });

    // Pick up live changes to the reduced-motion preference.
    reducedMotion.addEventListener("change", (e) => {
        if (e.matches) {
            stop();
            ctx.clearRect(0, 0, width, height);
        } else {
            start();
        }
    });

    // Resize handling: debounce so we don't thrash on drag-resize.
    let resizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            size();
            spawn();
        }, 150);
    });

    size();
    spawn();
    start();
})();
