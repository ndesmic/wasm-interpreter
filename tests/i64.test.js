import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { i64, WasmInterpreter } from "../src/interpreter.js";

Deno.test("i64.add", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 20n],
		i64.add
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 30n);
});


Deno.test("i64.add wrap", () => {
	const expr = [
		[i64.const, (i64.MAX - 5n)],
		[i64.const, 6n],
		i64.add
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});


Deno.test("i64.sub", () => {
	const expr = [
		[i64.const, 20n],
		[i64.const, 30n],
		i64.sub
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 10n);
});

Deno.test("i64.sub wrap", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, i64.SIGNED_MIN],
		i64.sub
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, i64.SIGNED_MAX - 9n);
});

Deno.test("i64.mul", () => {
	const expr = [
		[i64.const, 7n],
		[i64.const, 6n],
		i64.mul
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 42n);
});

Deno.test("i64.mul wrap", () => {
	const expr = [
		[i64.const, i64.MAX / 2n],
		[i64.const, 3n],
		i64.mul
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, i64.SIGNED_MAX + 1n);
});

Deno.test("i64.div_u", () => {
	const expr = [
		[i64.const, 7n],
		[i64.const, 21n],
		i64.div_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 3n);
});

Deno.test("i64.div_u trunc", () => {
	const expr = [
		[i64.const, 7n],
		[i64.const, 20n],
		i64.div_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 2n);
});

Deno.test("i64.div_u negative", () => {
	const expr = [
		[i64.const, -5n],
		[i64.const, 30n],
		i64.div_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, -6n);
});

Deno.test("i64.div_u 0", () => {
	const expr = [
		[i64.const, 0n],
		[i64.const, 44n],
		i64.div_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, undefined);
});

Deno.test("i64.div_s", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 50n],
		i64.div_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 5n);
});

Deno.test("i64.div_s trunc", () => {
	const expr = [
		[i64.const, 7n],
		[i64.const, 20n],
		i64.div_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 2n);
});

Deno.test("i64.div_s high", () => {
	const expr = [
		[i64.const, i64.SIGNED_MAX + 2n],
		[i64.const, 30n],
		i64.div_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 15n);
});

Deno.test("i64.div_s 0", () => {
	const expr = [
		[i64.const, 0],
		[i64.const, 99n],
		i64.div_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, undefined);
});

Deno.test("i64.rem_u", () => {
	const expr = [
		[i64.const, 6n],
		[i64.const, 25n],
		i64.rem_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.rem_u 0", () => {
	const expr = [
		[i64.const, 0n],
		[i64.const, 25n],
		i64.rem_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, undefined);
});

Deno.test("i64.and", () => {
	const expr = [
		[i64.const, 0b011n],
		[i64.const, 0b110n],
		i64.and
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b010n);
});

Deno.test("i64.or", () => {
	const expr = [
		[i64.const, 0b011n],
		[i64.const, 0b110n],
		i64.or
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b111n);
});

Deno.test("i64.xor", () => {
	const expr = [
		[i64.const, 0b011n],
		[i64.const, 0b110n],
		i64.xor
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b101n);
});

Deno.test("i64.shl", () => {
	const expr = [
		[i64.const, 0b11n],
		[i64.const, 2n],
		i64.shl
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b1100n);
});

Deno.test("i64.shr_u", () => {
	const expr = [
		[i64.const, ~3n],
		[i64.const, 2n],
		i64.shr_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 4611686018427387903n);
});

Deno.test("i64.shr_s", () => {
	const expr = [
		[i64.const, 0b1011n],
		[i64.const, 2n],
		i64.shr_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b10n);
});

Deno.test("i64.rotl", () => {
	const expr = [
		[i64.const, 0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00001011n],
		[i64.const, 2n],
		i64.rotl
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00101110n);
});

Deno.test("i64.rotr", () => {
	const expr = [
		[i64.const, 0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00001011n],
		[i64.const, 2n],
		i64.rotr
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0b11100000_00000000_00000000_00000000_00000000_00000000_00000000_00000010n);
});

Deno.test("i64.clz", () => {
	const expr = [
		[i64.const, 0b00000000_00000000_00000000_00001011n],
		i64.clz
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 28);
});

Deno.test("i64.ctz", () => {
	const expr = [
		[i64.const, 0b00000000_10000000_00000000_00000000n],
		i64.ctz
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 23n);
});

Deno.test("i64.popcnt", () => {
	const expr = [
		[i64.const, 0b00000001_10000000_10000000_10000000n],
		i64.popcnt
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 4n);
});

Deno.test("i64.eqz is not zero", () => {
	const expr = [
		[i64.const, 42n],
		i64.eqz
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.eqz is zero", () => {
	const expr = [
		[i64.const, 0n],
		i64.eqz
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.eq is equal", () => {
	const expr = [
		[i64.const, 42n],
		[i64.const, 42n],
		i64.eq
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.eq is not equal", () => {
	const expr = [
		[i64.const, 42n],
		[i64.const, 32n],
		i64.eq
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.ne is not equal", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 11n],
		i64.ne
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.ne is equal", () => {
	const expr = [
		[i64.const, 21n],
		[i64.const, 21n],
		i64.ne
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.lt_u is less than", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 10n],
		i64.lt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.lt_u is not less than", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 9n],
		i64.lt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.lt_u ignores sign", () => {
	const expr = [
		[i64.const, 1n],
		[i64.const, -1n],
		i64.lt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.lt_s is less than", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 10n],
		i64.lt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.lt_s is not less than", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 9n],
		i64.lt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.lt_s handles sign", () => {
	const expr = [
		[i64.const, 1n],
		[i64.const, -1n],
		i64.lt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.gt_u is greater than", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 9n],
		i64.gt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.gt_u is not greater than", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 10n],
		i64.gt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.gt_u ignores sign", () => {
	const expr = [
		[i64.const, -1n],
		[i64.const, 1n],
		i64.gt_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.gt_s is greater than", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 9n],
		i64.gt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.gt_s is not greater than", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 10n],
		i64.gt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.gt_s handles sign", () => {
	const expr = [
		[i64.const, -1n],
		[i64.const, 1n],
		i64.gt_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

//EQ

Deno.test("i64.le_u is less than", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 10n],
		i64.le_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.le_u is not less than", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 9n],
		i64.le_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.le_u is equal", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 9n],
		i64.le_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.le_u ignores sign", () => {
	const expr = [
		[i64.const, 1n],
		[i64.const, -1n],
		i64.le_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.le_s is less than", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 10n],
		i64.le_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.le_s is not less than", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 9n],
		i64.le_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.le_s is equal", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 10n],
		i64.le_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.le_s handles sign", () => {
	const expr = [
		[i64.const, 1n],
		[i64.const, -1n],
		i64.le_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.ge_u is greater than", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 9n],
		i64.ge_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.ge_u is not greater than", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 10n],
		i64.ge_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.ge_u is equal", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 9n],
		i64.ge_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.ge_u ignores sign", () => {
	const expr = [
		[i64.const, -1n],
		[i64.const, 1n],
		i64.ge_u
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.ge_s is greater than", () => {
	const expr = [
		[i64.const, 10n],
		[i64.const, 9n],
		i64.ge_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});

Deno.test("i64.ge_s is not greater than", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 10n],
		i64.ge_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});

Deno.test("i64.ge_s is equal", () => {
	const expr = [
		[i64.const, 9n],
		[i64.const, 9n],
		i64.ge_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 1n);
});


Deno.test("i64.ge_s handles sign", () => {
	const expr = [
		[i64.const, -1n],
		[i64.const, 1n],
		i64.ge_s
	];

	const wasm = new WasmInterpreter();
	wasm.execute(expr);
	const result = wasm.stack[0];

	assertEquals(result, 0n);
});