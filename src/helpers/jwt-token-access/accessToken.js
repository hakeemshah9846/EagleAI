let accessToken = null;

if (localStorage.getItem("authUser")) {
    const obj   = JSON.parse(localStorage.getItem("authUser"));
    accessToken = obj?.access_token;;
}

export default accessToken;
