import { expect, test } from "vitest";
import * as z from "zod/v4";

test("locales - lt too_big/too_small without trailing undefined", () => {
  z.config(z.locales.lt());

  // unsized origins used to interpolate sizing?.unit as the literal "undefined"
  expect(z.number().max(5).safeParse(9).error!.issues[0].message).toBe("Skaičius turi būti ne didesnis kaip 5");
  expect(z.number().min(5).safeParse(1).error!.issues[0].message).toBe("Skaičius turi būti ne mažesnis kaip 5");
  expect(z.bigint().max(5n).safeParse(9n).error!.issues[0].message).toBe(
    "Sveikasis skaičius turi būti ne didesnis kaip 5"
  );
  expect(z.date().min(new Date(5)).safeParse(new Date(1)).error!.issues[0].message).toBe(
    "Date turi būti ne mažesnis kaip 5"
  );
});
