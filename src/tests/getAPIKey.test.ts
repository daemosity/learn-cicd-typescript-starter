import { describe, expect, it } from "vitest";
import { getAPIKey } from "src/api/auth";

describe("getAPIKey", () => {
  it("should return null if authorization header is missing", () => {
    // Arrange
    const headers = {};

    // Act
    const apiKey = getAPIKey(headers);

    // Assert
    expect(apiKey).toBeNull();
  });

  it("should return null if authorization header is not in the correct format", () => {
    // Act
    const apiKey = getAPIKey({ authorization: "invalid_format" });

    // Assert
    expect(apiKey).toBeNull();
  });

  it("should return null if authorization header is empty", () => {
    // Act
    const apiKey = getAPIKey({ authorization: "" });

    // Assert
    expect(apiKey).toBeNull();
  });

  it("should return null if authorization header has only one part", () => {
    // Act
    const apiKey = getAPIKey({ authorization: "ApiKey" });

    // Assert
    expect(apiKey).toBeNull();
  });

  it("should return null if authorization header has incorrect prefix", () => {
    // Act
    const apiKey = getAPIKey({ authorization: "Bearer my_api_key" });

    // Assert
    expect(apiKey).toBeNull();
  });

  it("should return the API key if the authorization header is valid", () => {
    // Act
    const apiKey = getAPIKey({ authorization: "ApiKey my_api_key" });

    // Assert
    expect(apiKey).toBe("my_api_key");
  });

  it("should return the API key if the authorization header has more than two parts", () => {
    // Act
    const apiKey = getAPIKey({ authorization: "ApiKey my_api_key extra_part" });

    // Assert
    expect(apiKey).toBe("my_api_key");
  });

  it("should return the API key with spaces if it contains spaces", () => {
    // Act
    const apiKey = getAPIKey({
      authorization: "ApiKey my api key with spaces",
    });

    // Assert
    expect(apiKey).toBe("my");
  });

  it("should return the API key with special characters if it contains special characters", () => {
    // Act
    const apiKey = getAPIKey({
      authorization: "ApiKey my-api-key-with_special.characters!",
    });

    // Assert
    expect(apiKey).toBe("my-api-key-with_special.characters!");
  });
});
