import 'kleur/colors';
import { q as decodeKey } from './chunks/astro/server_C8j2iYjO.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D7ihcfm3.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Windows10%20Lte/Desktop/SyncSpend-Project-main/apps/frontend/","cacheDir":"file:///C:/Users/Windows10%20Lte/Desktop/SyncSpend-Project-main/apps/frontend/node_modules/.astro/","outDir":"file:///C:/Users/Windows10%20Lte/Desktop/SyncSpend-Project-main/apps/frontend/dist/","srcDir":"file:///C:/Users/Windows10%20Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/","publicDir":"file:///C:/Users/Windows10%20Lte/Desktop/SyncSpend-Project-main/apps/frontend/public/","buildClientDir":"file:///C:/Users/Windows10%20Lte/Desktop/SyncSpend-Project-main/apps/frontend/dist/client/","buildServerDir":"file:///C:/Users/Windows10%20Lte/Desktop/SyncSpend-Project-main/apps/frontend/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"forms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/forms","isIndex":false,"type":"page","pattern":"^\\/forms\\/?$","segments":[[{"content":"forms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/forms.astro","pathname":"/forms","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"signup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.BIdAVNqI.css"}],"routeData":{"route":"/verify/[token]","isIndex":false,"type":"page","pattern":"^\\/verify\\/([^/]+?)\\/?$","segments":[[{"content":"verify","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/verify/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/forms.astro",{"propagation":"none","containsHead":true}],["C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/verify/[token].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/forms@_@astro":"pages/forms.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/verify/[token]@_@astro":"pages/verify/_token_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:../../node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DFD-fMDW.mjs","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B6WmrWWe.mjs","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/dashboard.astro?astro&type=script&index=1&lang.ts":"_astro/dashboard.astro_astro_type_script_index_1_lang.Ds9P6cqp.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/forms.astro?astro&type=script&index=0&lang.ts":"_astro/forms.astro_astro_type_script_index_0_lang.X6-eYWQb.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.BaKZZeDv.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts":"_astro/dashboard.astro_astro_type_script_index_0_lang.FOz0pKd5.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts":"_astro/_token_.astro_astro_type_script_index_0_lang.CwO7B78A.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/pages/signup.astro?astro&type=script&index=0&lang.ts":"_astro/signup.astro_astro_type_script_index_0_lang.DIpU_Wdj.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/features/auth/AuthProtected.astro?astro&type=script&index=0&lang.ts":"_astro/AuthProtected.astro_astro_type_script_index_0_lang.Br1N3k-V.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/features/auth/AuthUnprotected.astro?astro&type=script&index=0&lang.ts":"_astro/AuthUnprotected.astro_astro_type_script_index_0_lang.Dj0WS-3P.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/features/accounts/CreateAccountForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateAccountForm.astro_astro_type_script_index_0_lang.CtA3nuKO.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/features/accounts/AccountsList.astro?astro&type=script&index=0&lang.ts":"_astro/AccountsList.astro_astro_type_script_index_0_lang.Ca5hEgSK.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/features/transactions/CreateTransactionsForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateTransactionsForm.astro_astro_type_script_index_0_lang.Wh5FmPmH.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/features/transactions/TransactionsList.astro?astro&type=script&index=0&lang.ts":"_astro/TransactionsList.astro_astro_type_script_index_0_lang.B-Lqd4TR.js","C:/Users/Windows10 Lte/Desktop/SyncSpend-Project-main/apps/frontend/src/features/navigation/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.CUqo0Xag.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/Logo.B8O_S9lL.png","/_astro/dashboard.BIdAVNqI.css","/favicon.svg","/_astro/accounts.module.CLXOAEk-.js","/_astro/AccountsList.astro_astro_type_script_index_0_lang.Ca5hEgSK.js","/_astro/auth.module.DXvdflnj.js","/_astro/AuthProtected.astro_astro_type_script_index_0_lang.Br1N3k-V.js","/_astro/AuthUnprotected.astro_astro_type_script_index_0_lang.Dj0WS-3P.js","/_astro/CreateAccountForm.astro_astro_type_script_index_0_lang.CtA3nuKO.js","/_astro/CreateTransactionsForm.astro_astro_type_script_index_0_lang.Wh5FmPmH.js","/_astro/dashboard.astro_astro_type_script_index_0_lang.FOz0pKd5.js","/_astro/dashboard.astro_astro_type_script_index_1_lang.Ds9P6cqp.js","/_astro/forms.astro_astro_type_script_index_0_lang.X6-eYWQb.js","/_astro/index.BXL97NTB.js","/_astro/index.CViUNx8d.js","/_astro/login.astro_astro_type_script_index_0_lang.BaKZZeDv.js","/_astro/Navigation.astro_astro_type_script_index_0_lang.CUqo0Xag.js","/_astro/notificiation.BI0G4Md-.js","/_astro/signup.astro_astro_type_script_index_0_lang.DIpU_Wdj.js","/_astro/transactions.module.uFFnM2s4.js","/_astro/TransactionsList.astro_astro_type_script_index_0_lang.B-Lqd4TR.js","/_astro/_token_.astro_astro_type_script_index_0_lang.CwO7B78A.js","/dashboard/index.html","/forms/index.html","/login/index.html","/signup/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"FOFnT/emQVs5qQ2VVo5Uzq7SES1ap9wPwj0L6HHDqy8=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\Windows10 Lte\\Desktop\\SyncSpend-Project-main\\apps\\frontend\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
