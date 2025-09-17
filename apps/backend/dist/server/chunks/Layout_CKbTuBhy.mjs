import { e as createComponent, m as maybeRenderHead, h as addAttribute, l as renderScript, r as renderTemplate, f as createAstro, p as renderHead, k as renderComponent, n as renderSlot } from './astro/server_C8j2iYjO.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

const logoPng = new Proxy({"src":"/_astro/Logo.B8O_S9lL.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/EDTecnica/Desktop/SyncSpend-Project-main/apps/frontend/src/assets/Logo.png";
							}
							
							return target[name];
						}
					});

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="bg-teal-700 text-white fixed top-0 left-0 right-0 z-50"> <div class="max-w-7xl mx-auto h-16 flex items-center justify-between px-4"> <div class="flex items-center gap-2 h-full"> <img class="w-12 h-12 md:w-20 md:h-20"${addAttribute(logoPng.src, "src")} alt="logo"> <h2 class="font-medium text-xl">SyncSpend</h2> </div> <!-- Desktop Links --> <div id="nav-desktop-links" class="hidden md:flex items-center gap-4"> <div id="links-container" class="flex items-center gap-4"></div> <div id="nav-user-container"> <p id="nav-user-name" class="px-3 py-1 rounded-full bg-white/10 text-white transition duration-300 ease-in-out hover:bg-white/20"></p> </div> </div> <!-- Mobile Menu Button --> <button id="mobile-menu-btn" class="md:hidden flex items-center justify-center p-2 rounded-md bg-white text-teal-700"> <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> </button> </div> <!-- Mobile Menu --> <div id="mobile-menu" class="hidden fixed inset-y-0 right-0 w-64 bg-teal-800 text-white transform transition-transform duration-300 ease-in-out z-40 p-4"> <div class="flex justify-end"> <button id="close-mobile-menu-btn" class="p-2 rounded-md text-white hover:bg-teal-700"> <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <div id="mobile-links-container" class="flex flex-col gap-4 mt-8"></div> </div> <!-- Mobile Menu Overlay --> <div id="mobile-menu-overlay" class="hidden fixed inset-0 bg-black opacity-50 z-30"></div> </nav> ${renderScript($$result, "C:/Users/EDTecnica/Desktop/SyncSpend-Project-main/apps/frontend/src/features/navigation/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/EDTecnica/Desktop/SyncSpend-Project-main/apps/frontend/src/features/navigation/Navigation.astro", void 0);

const $$Notification = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="notification" class="fixed p-4 top-4 right-4 rounded-2xl  shadow-lg shadow-black/20 w-80 max-w-full animate-slide-in z-[60] hidden"> <p id="notification-title" class="font-semibold text-lg mb-1 select-none text-white">Error</p> <p id="notification-description" class="text-sm select-text text-white">Hubo un error obteniendo los contactos</p> </div>`;
}, "C:/Users/EDTecnica/Desktop/SyncSpend-Project-main/apps/frontend/src/features/notifications/Notification.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="pt-16" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Notification", $$Notification, { "data-astro-cid-sckkx6r4": true })} ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-sckkx6r4": true })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/EDTecnica/Desktop/SyncSpend-Project-main/apps/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
