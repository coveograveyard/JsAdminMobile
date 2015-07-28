// TODO : should be set depending on env.
var baseApi = 'https://platformstratus.cloud.coveo.com/rest/';
var loginUri = 'https://logindev.cloud.coveo.com/';

var urlParts = window.location.hash.replace('#', '?').split('?');
var arguments = urlParts[urlParts.length - 1].split('&');
var noPopUp = true;

// If has error
if (_.find(arguments, function (obj) {
        return obj.split('=')[0].trim() == "error";
    }) != null) {
    redirectToLogout();
}

var urlToken = _.find(arguments, function (obj) {
    return obj.split('=')[0].trim() == "access_token";
});

if (urlToken != null) {
    localStorage.setItem("access_token", urlToken.split('=')[1]);
}

var bearer = localStorage.getItem("access_token");

if (bearer == null) {
    redirectToLogin();
}

var actualWorkgroup = localStorage.getItem("workgroup") || '';

function toTitle(str) {
    return str.replace(/_/g, ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function toDateStr(date) {
    if (date != null) {
        var splitDate = date.split('T');
        return splitDate[0] + ' ' + splitDate[1].split('.')[0];
    }
    return '';
}

function redirectToLogin(status) {
    if (status == null || status == 401) {
        window.location.replace(loginUri + "oauth/authorize?client_id=JSAdmin&response_type=token&redirect_uri="
            + window.location.origin
            + "&scope=administrate%20executeQuery%20impersonate%20rankingEdit%20readUA%20");
    }
}

function redirectToLogout() {
    deleteToken();
    window.location.replace(loginUri + 'logout');
}

function redirectToHome() {
    window.location.replace(window.location.href.split('#')[0]);
}

function deleteToken() {
    localStorage.removeItem("access_token");
}

angular.module('coveomobile.services', []);
