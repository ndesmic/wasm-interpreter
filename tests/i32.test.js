import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { i32, WasmInterpreter } from "../src/interpreter.js";

Deno.test("i32.add", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 20n],
		i32.add
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 30n);
});

Deno.test("i32.add wrap", () => {
	const expr = [
		[i32.const, (i32.MAX - 5n)],
		[i32.const, 6n],
		i32.add
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.sub", () => {
	const expr = [
		[i32.const, 20n],
		[i32.const, 30n],
		i32.sub
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 10n);
});

Deno.test("i32.sub wrap", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, i32.SIGNED_MIN],
		i32.sub
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, i32.SIGNED_MAX - 9n);
});

Deno.test("i32.mul", () => {
	const expr = [
		[i32.const, 7n],
		[i32.const, 6n],
		i32.mul
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 42n);
});

Deno.test("i32.mul wrap", () => {
	const expr = [
		[i32.const, i32.MAX / 2n],
		[i32.const, 3n],
		i32.mul
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, i32.SIGNED_MAX + 1n);
});

Deno.test("i32.div_u", () => {
	const expr = [
		[i32.const, 7n],
		[i32.const, 21n],
		i32.div_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 3n);
});

Deno.test("i32.div_u trunc", () => {
	const expr = [
		[i32.const, 7n],
		[i32.const, 20n],
		i32.div_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 2n);
});

Deno.test("i32.div_u negative", () => {
	const expr = [
		[i32.const, -5n],
		[i32.const, 30n],
		i32.div_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, -6n);
});

Deno.test("i32.div_u 0", () => {
	const expr = [
		[i32.const, 0n],
		[i32.const, 44n],
		i32.div_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, undefined);
});

Deno.test("i32.div_s", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 50n],
		i32.div_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 5n);
});

Deno.test("i32.div_s trunc", () => {
	const expr = [
		[i32.const, 7n],
		[i32.const, 20n],
		i32.div_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 2n);
});

Deno.test("i32.div_s high", () => {
	const expr = [
		[i32.const, i32.SIGNED_MAX + 2n],
		[i32.const, 30n],
		i32.div_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 15n);
});

Deno.test("i32.div_s 0", () => {
	const expr = [
		[i32.const, 0],
		[i32.const, 99n],
		i32.div_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, undefined);
});

Deno.test("i32.rem_u", () => {
	const expr = [
		[i32.const, 6n],
		[i32.const, 25n],
		i32.rem_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.rem_u 0", () => {
	const expr = [
		[i32.const, 0n],
		[i32.const, 25n],
		i32.rem_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, undefined);
});

Deno.test("i32.and", () => {
	const expr = [
		[i32.const, 0b011n],
		[i32.const, 0b110n],
		i32.and
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b010n);
});

Deno.test("i32.or", () => {
	const expr = [
		[i32.const, 0b011n],
		[i32.const, 0b110n],
		i32.or
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b111n);
});

Deno.test("i32.xor", () => {
	const expr = [
		[i32.const, 0b011n],
		[i32.const, 0b110n],
		i32.xor
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b101n);
});

Deno.test("i32.shl", () => {
	const expr = [
		[i32.const, 0b11n],
		[i32.const, 2n],
		i32.shl
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b1100n);
});

Deno.test("i32.shr_u", () => {
	const expr = [
		[i32.const, ~3n],
		[i32.const, 2n],
		i32.shr_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1073741823n);
});

Deno.test("i32.shr_s", () => {
	const expr = [
		[i32.const, 0b1011n],
		[i32.const, 2n],
		i32.shr_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b10n);
});

Deno.test("i32.rotl", () => {
	const expr = [
		[i32.const, 0b10000000_00000000_00000000_00001011n],
		[i32.const, 2n],
		i32.rotl
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b00000000_00000000_00000000_00101110n);
});

Deno.test("i32.rotr", () => {
	const expr = [
		[i32.const, 0b10000000_00000000_00000000_00001011n],
		[i32.const, 2n],
		i32.rotr
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b11100000_00000000_00000000_00000010n);
});

Deno.test("i32.clz", () => {
	const expr = [
		[i32.const, 0b00000000_00000000_00000000_00001011n],
		i32.clz
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 28);
});

Deno.test("i32.ctz", () => {
	const expr = [
		[i32.const, 0b00000000_10000000_00000000_00000000n],
		i32.ctz
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 23n);
});

Deno.test("i32.popcnt", () => {
	const expr = [
		[i32.const, 0b00000001_10000000_10000000_10000000n],
		i32.popcnt
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 4n);
});

Deno.test("i32.eqz is not zero", () => {
	const expr = [
		[i32.const, 42n],
		i32.eqz
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.eqz is zero", () => {
	const expr = [
		[i32.const, 0n],
		i32.eqz
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.eq is equal", () => {
	const expr = [
		[i32.const, 42n],
		[i32.const, 42n],
		i32.eq
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.eq is not equal", () => {
	const expr = [
		[i32.const, 42n],
		[i32.const, 32n],
		i32.eq
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.ne is not equal", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 11n],
		i32.ne
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.ne is equal", () => {
	const expr = [
		[i32.const, 21n],
		[i32.const, 21n],
		i32.ne
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.lt_u is less than", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 10n],
		i32.lt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.lt_u is not less than", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 9n],
		i32.lt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.lt_u ignores sign", () => {
	const expr = [
		[i32.const, 1n],
		[i32.const, -1n],
		i32.lt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.lt_s is less than", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 10n],
		i32.lt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.lt_s is not less than", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 9n],
		i32.lt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.lt_s handles sign", () => {
	const expr = [
		[i32.const, 1n],
		[i32.const, -1n],
		i32.lt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.gt_u is greater than", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 9n],
		i32.gt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.gt_u is not greater than", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 10n],
		i32.gt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.gt_u ignores sign", () => {
	const expr = [
		[i32.const, -1n],
		[i32.const, 1n],
		i32.gt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.gt_s is greater than", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 9n],
		i32.gt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.gt_s is not greater than", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 10n],
		i32.gt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.gt_s handles sign", () => {
	const expr = [
		[i32.const, -1n],
		[i32.const, 1n],
		i32.gt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

//EQ

Deno.test("i32.le_u is less than", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 10n],
		i32.le_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.le_u is not less than", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 9n],
		i32.le_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.le_u is equal", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 9n],
		i32.le_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.le_u ignores sign", () => {
	const expr = [
		[i32.const, 1n],
		[i32.const, -1n],
		i32.le_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.le_s is less than", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 10n],
		i32.le_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.le_s is not less than", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 9n],
		i32.le_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.le_s is equal", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 10n],
		i32.le_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.le_s handles sign", () => {
	const expr = [
		[i32.const, 1n],
		[i32.const, -1n],
		i32.le_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.ge_u is greater than", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 9n],
		i32.ge_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.ge_u is not greater than", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 10n],
		i32.ge_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.ge_u is equal", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 9n],
		i32.ge_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.ge_u ignores sign", () => {
	const expr = [
		[i32.const, -1n],
		[i32.const, 1n],
		i32.ge_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.ge_s is greater than", () => {
	const expr = [
		[i32.const, 10n],
		[i32.const, 9n],
		i32.ge_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i32.ge_s is not greater than", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 10n],
		i32.ge_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i32.ge_s is equal", () => {
	const expr = [
		[i32.const, 9n],
		[i32.const, 9n],
		i32.ge_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});


Deno.test("i32.ge_s handles sign", () => {
	const expr = [
		[i32.const, -1n],
		[i32.const, 1n],
		i32.ge_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});
