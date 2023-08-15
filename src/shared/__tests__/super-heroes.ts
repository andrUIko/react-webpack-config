import { getFlyingSuperheroes } from "../super-heroes.ts";

const flyingSuperheroes = [
	{
		name: "Batman",
		powers: ["fly"],
	},
	{
		name: "Superman",
		powers: ["fly", "super strength"],
	},
	{
		name: "Wonder Woman",
		powers: ["fly", "super strength", "super speed"],
	},
	{
		name: "Green Lantern",
		powers: ["invisibility", "super speed", "fly"],
	},
];

test("returns super heroes that can fly", () => {
	expect(getFlyingSuperheroes()).toMatchInlineSnapshot(
		flyingSuperheroes,
		`
		[
		  {
		    "name": "Batman",
		    "powers": [
		      "fly",
		    ],
		  },
		  {
		    "name": "Superman",
		    "powers": [
		      "fly",
		      "super strength",
		    ],
		  },
		  {
		    "name": "Wonder Woman",
		    "powers": [
		      "fly",
		      "super strength",
		      "super speed",
		    ],
		  },
		  {
		    "name": "Green Lantern",
		    "powers": [
		      "invisibility",
		      "super speed",
		      "fly",
		    ],
		  },
		]
	`
	);
});
