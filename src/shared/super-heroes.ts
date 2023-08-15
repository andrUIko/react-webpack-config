interface Superhero {
	name: string;
	powers: string[];
}

const superheroes: Superhero[] = [
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
		name: "Flash",
		powers: ["super strength", "super speed", "invisibility"],
	},
	{
		name: "Green Lantern",
		powers: ["invisibility", "super speed", "fly"],
	},
];

/**
+ * Filters the superheroes array to return only the superheroes that have the power to fly.
+ *
+ * @return {Array} An array of superheroes that can fly.
+ */
const getFlyingSuperheroes = () => {
	return superheroes.filter((hero) => hero.powers.includes("fly"));
};

export { getFlyingSuperheroes };
