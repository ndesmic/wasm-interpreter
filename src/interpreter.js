function Int(size) {
	const MAX = 2n ** size;
	const NUM_SIZE = Number(size);
	const SIGNED_MAX = 2n ** (size - 1n) - 1n;
	const SIGNED_MIN = -(2n ** (size - 1n));
	
	function signed(i) {
		if (0 <= i && i < SIGNED_MAX) return i;
		if (SIGNED_MAX <= i && i < MAX) return i - SIGNED_MAX;
		throw new Error(`i value was out of range for signed32. Value recieved: ${i}`);
	}

	return class {
		static MAX = MAX;
		static SIGNED_MAX = SIGNED_MAX;
		static SIGNED_MIN = SIGNED_MIN;

		static add(stack) {
			stack.push((stack.pop() + stack.pop()) % MAX);
		}
		static sub(stack) {
			stack.push(((stack.pop() - stack.pop()) + MAX) % MAX);
		}
		static mul(stack) {
			stack.push((stack.pop() * stack.pop()) % MAX);
		}
		static div_u(stack) {
			const i1 = stack.pop();
			const i2 = stack.pop();
			const result = i2 === 0n
				? undefined
				: i1 / i2;
			stack.push(result);
		}
		static div_s(stack) {
			const j1 = signed(stack.pop());
			const j2 = signed(stack.pop());
			if (j2 == 0n) return stack.push(undefined);
			const result = j1 / j2;
			if (result === SIGNED_MAX) return stack.push(undefined);
			stack.push(result);
		}
		static const(stack, x) {
			stack.push(x);
		}
		static rem_u(stack) {
			const i1 = stack.pop();
			const i2 = stack.pop();
			const result = i2 === 0n
				? undefined
				: i1 - (i2 * (i1 / i2));
			stack.push(result);
		}
		static rem_s(stack) {
			const j1 = signed(stack.pop())
			const j2 = signed(stack.pop());
			if (j2 == 0n) return stack.push(undefined);
			stack.push(j1 - (j2 * (j1 / j2)));
		}
		static and(stack) {
			stack.push(stack.pop() & stack.pop());
		}
		static or(stack) {
			stack.push(stack.pop() | stack.pop());
		}
		static xor(stack) {
			stack.push(stack.pop() ^ stack.pop());
		}
		static shl(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(i1 << i2);
		}
		static shr_u(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(BigInt.asUintN(NUM_SIZE, i1) >> i2);
		}
		static shr_s(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(i1 >> i2);
		}
		static rotl(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop() % MAX;
			stack.push(((i1 << i2) & (MAX - 1n)) | i1 >> (size - i2));
		}
		static rotr(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop() % MAX;
			stack.push((i1 >> i2) | ((i1 << (size - i2)) & (MAX - 1n)));
		}
		static clz(stack) {
			stack.push(Math.clz32(Number(BigInt.asUintN(NUM_SIZE, stack.pop()))));
		}
		static ctz(stack) {
			const i1 = stack.pop();
			let mask = 1n;
			for (let i = 0n; i < size; i++) {
				if ((i1 & mask) != 0) return stack.push(i);
				mask <<= 1n;
			}

			stack.push(32);
		}
		static popcnt(stack) {
			const i1 = stack.pop();
			let mask = 1n;
			let sum = 0n;
			for (let i = 0n; i < size; i++) {
				if ((i1 & mask) != 0) sum++;
				mask <<= 1n;
			}

			stack.push(sum);
		}
		static eqz(stack) {
			stack.push(stack.pop() === 0n ? 1n : 0n);
		}
		static eq(stack) {
			stack.push(stack.pop() === stack.pop() ? 1n : 0n);
		}
		static ne(stack) {
			stack.push(stack.pop() !== stack.pop() ? 1n : 0n);
		}
		static lt_u(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(BigInt.asUintN(NUM_SIZE, i1) < BigInt.asUintN(NUM_SIZE, i2) ? 1n : 0n);
		}
		static lt_s(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(i1 < i2 ? 1n : 0n);
		}
		static gt_u(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(BigInt.asUintN(NUM_SIZE, i1) > BigInt.asUintN(NUM_SIZE, i2) ? 1n : 0n);
		}
		static gt_s(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(i1 > i2 ? 1n : 0n);
		}
		static le_u(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(BigInt.asUintN(NUM_SIZE, i1) <= BigInt.asUintN(NUM_SIZE, i2) ? 1n : 0n);
		}
		static le_s(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(i1 <= i2 ? 1n : 0n);
		}
		static ge_u(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(BigInt.asUintN(NUM_SIZE, i1) >= BigInt.asUintN(NUM_SIZE, i2) ? 1n : 0n);
		}
		static ge_s(stack) {
			const i2 = stack.pop();
			const i1 = stack.pop();
			stack.push(i1 >= i2 ? 1n : 0n);
		}
	}
};

export const i32 = Int(32n);
export const i64 = Int(64n);

export class WasmInterpreter {
	stack = [];

	execute(ast){
		for(const node of ast){
			if(Array.isArray(node)){
				node[0](this.stack, ...node.slice(1));
			} else {
				node(this.stack)
			}
		}
	}
}