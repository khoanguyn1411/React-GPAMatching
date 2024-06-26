import { DetailErrorDto } from "@/core/dtos/http-error.dto";

export namespace ErrorHandler {
  /**
   * Extract errors message from error data.
   * @param errorData Error data.
   * @returns The first item if error data is a array of error messages.
   * Error message from non_field_errors if it presented.
   * Error message of the first key if error data is error for composite object like City: { id, name }.
   */
  export function extractErrorMessage<T>(
    errorData: DetailErrorDto<T> | string[] | null | undefined,
  ): string | undefined {
    if (errorData == null) {
      return;
    }
    if (Array.isArray(errorData)) {
      return extractErrorMessageFromArray(errorData);
    }
    if (typeof errorData === "object") {
      // Otherwise extract an error from first property.
      const key = Object.keys(errorData)[0] as keyof T;
      return extractErrorMessage(errorData[key] as any);
    }
    return void 0;
  }

  /**
   * Extracts a string error from an array of errors.
   * @param errors Errors array.
   * @returns Extracted error string.
   */
  export function extractErrorMessageFromArray(errors: string[]): string {
    if (errors.length === 0) {
      throw new Error("Empty errors array");
    }
    const error = errors[0];
    if (typeof error !== "string") {
      throw new Error(`String expected but ${typeof error} has gotten`);
    }
    return error;
  }
}
