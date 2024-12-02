import { describe, expect, it } from "@jest/globals";
import {
  createMediaSlug,
  createMediaDetailsUrl,
  extractIdFromSlug,
} from "./url";

describe("URL utilities", () => {
  describe("createMediaSlug", () => {
    it("should create a valid slug from title and id", () => {
      expect(createMediaSlug("Hello World", "123")).toBe(
        "hello-world.__id-123"
      );
      expect(createMediaSlug("Multiple   Spaces", "456")).toBe(
        "multiple-spaces.__id-456"
      );
      expect(createMediaSlug("Title with --- dashes", "789")).toBe(
        "title-with----dashes.__id-789"
      );
    });
  });

  describe("createMediaDetailsUrl", () => {
    it("should create a valid details URL", () => {
      expect(createMediaDetailsUrl("photo", "Beach Sunset", "123")).toBe(
        "/details/photo/beach-sunset--123"
      );
    });
  });

  describe("extractIdFromSlug", () => {
    it("should extract ID from slug", () => {
      expect(extractIdFromSlug("hello-world.__id-123")).toBe("123");
      expect(extractIdFromSlug("title-with----dashes.__id-456")).toBe("456");
    });
  });
});
