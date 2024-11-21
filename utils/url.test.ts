import {
  createMediaSlug,
  createMediaDetailsUrl,
  extractIdFromSlug,
} from "../url";

describe("URL utilities", () => {
  describe("createMediaSlug", () => {
    it("should create a valid slug from title and id", () => {
      expect(createMediaSlug("Hello World", "123")).toBe("hello-world--123");
      expect(createMediaSlug("Multiple   Spaces", "456")).toBe(
        "multiple-spaces--456"
      );
      expect(createMediaSlug("Special!@#$Characters", "789")).toBe(
        "special!@#$characters--789"
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
      expect(extractIdFromSlug("hello-world--123")).toBe("123");
      expect(extractIdFromSlug("complex-title-with-dashes--456")).toBe("456");
    });
  });
});
