// Helpers
const displayView = name => ['view-loading', 'view-error', 'view-authenticated', 'view-unauthenticated'].forEach((v) => {
    if(v === name){
        document.getElementById(`${v}`).style.display = "flex";
        console.log("current view: " + v);
    }else{
        document.getElementById(`${v}`).style.display = "none";
        console.log(v);
    }
});
const setTextContent = (id, content) => document.getElementById(id).textContent = content;

(async () => {
    // Initialize the Auth0 SDK
window.client = await auth0.createAuth0Client({
    domain: 'dev-s5bvztk226kbwjaq.us.auth0.com',
    clientId: '0B1EU0GSFYJe3H5ZcUXvb3PBre1Qr8lP',
    authorizationParams: { redirect_uri: location.origin },
});

// Handle errors returned by Auth0 after a redirect
if (location.search.includes("error=")) {
    const params = new URLSearchParams(location.search);
    setTextContent("view-error", `Error: ${params.get("error")} — ${params.get("error_description")}`);
    displayView("view-error");
    history.replaceState({}, "", location.pathname);
    return;
}

// Handle the redirect callback after a successful login
if (location.search.includes("code=") && location.search.includes("state=")) {
    await window.client.handleRedirectCallback();
    history.replaceState({}, "", location.pathname);
}

if (await window.client.isAuthenticated()) {
    const user = await window.client.getUser();
    setTextContent("user-email", user.email);
    displayView("view-authenticated");
    return;
}

displayView("view-unauthenticated");
})();