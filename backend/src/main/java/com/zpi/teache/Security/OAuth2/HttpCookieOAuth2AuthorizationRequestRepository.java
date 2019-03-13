package com.zpi.teache.Security.OAuth2;

import org.springframework.stereotype.Component;

@Component
public class HttpCookieOAuth2AuthorizationRequestRepository {

    public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
    private static final int cookieExpireSeconds = 180;

}
