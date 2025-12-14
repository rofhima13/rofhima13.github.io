(function () {
            const THEME_KEY = 'theme';
            const toggleBtn = document.getElementById('theme-toggle');

            function applyTheme(theme) {
                const root = document.documentElement;
                if (theme === 'dark') root.classList.add('dark');
                else root.classList.remove('dark');
                toggleBtn.setAttribute('aria-pressed', theme === 'dark');
                const icon = document.getElementById('theme-icon');
                if (icon) icon.textContent = theme === 'dark' ? 'dark' : 'light';
                toggleBtn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
            }

            function getPreferredTheme() {
                const stored = localStorage.getItem(THEME_KEY);
                if (stored === 'dark' || stored === 'light') return stored;
                return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }

            // Initialize
            const initial = getPreferredTheme();
            applyTheme(initial);

            // Respond to user toggle
            toggleBtn.addEventListener('click', () => {
                const isDark = document.documentElement.classList.contains('dark');
                const newTheme = isDark ? 'light' : 'dark';
                applyTheme(newTheme);
                localStorage.setItem(THEME_KEY, newTheme);
            });

            // If the user has not explicitly chosen a theme, follow system changes
            try {
                const mq = window.matchMedia('(prefers-color-scheme: dark)');
                mq.addEventListener && mq.addEventListener('change', (e) => {
                    if (!localStorage.getItem(THEME_KEY)) {
                        applyTheme(e.matches ? 'dark' : 'light');
                    }
                });
            } catch (e) {
                // matchMedia not supported; ignore
            }
        })();