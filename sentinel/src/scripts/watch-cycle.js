(function () {
    try {
        new x_snc_a2a_sentinel.A2ASentinel().runCycle();
    } catch (e) {
        gs.error('[A2ASentinel] Watch cycle failed: ' + e);
    }
})();
