import authentication, { loginSuccess, initial, logoutSuccess, loginUnSuccessful, clearError, toggleDisplayLogin } from "./AuthenticationSlice";

describe("Authentication reducer", () => {
  it("should handle initil state", () => {
    expect(authentication(undefined, initial)).toEqual({ displayLogin: true, error: null, user: null });
  });

  it("should handle login", () => {
    expect(
      authentication(
        undefined,
        loginSuccess({
          userName: "ghoshanjega",
          fullName: "Ghoshan Jaganathamani",
          sessionId: "1613379177494",
        })
      )
    ).toEqual({
      displayLogin: true,
      error: null,
      user: { userName: "ghoshanjega", fullName: "Ghoshan Jaganathamani", sessionId: "1613379177494" },
    });
  });

  it("should handle logout", () => {
    expect(
      authentication(
        undefined,
        logoutSuccess()
      )
    ).toEqual({
      displayLogin: true,
      error: null,
      user: null,
    });
  });

  it("should login unsuccesful", () => {
    expect(
      authentication(
        undefined,
        loginUnSuccessful({
         message : "This is an error message",
         status: "error",
         statusCode: 310
        })
      )
    ).toEqual({
      displayLogin: true,
      error: {
        message : "This is an error message",
        status: "error",
        statusCode: 310
       },
      user: null,
    });
  });

  it("should clear error", () => {
    expect(
      authentication(
        {
            displayLogin: true,
            error: {
              message : "This is an error message",
              status: "error",
              statusCode: 310
             },
            user: null,
          },
        clearError()
      )
    ).toEqual({
      displayLogin: true,
      error: null,
      user: null,
    });
  });

  it("should should toggle display login", () => {
    expect(
      authentication(
        {
            displayLogin: true,
            error: null,
            user: null,
          },
        toggleDisplayLogin()
      )
    ).toEqual({
      displayLogin: false,
      error: null,
      user: null,
    });
  });

});
