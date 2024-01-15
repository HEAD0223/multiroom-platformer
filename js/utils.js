Array.prototype.parse2D = function () {
	const rows = [];
	for (let i = 0; i < this.length; i += 16) {
		rows.push(this.slice(i, i + 16));
	}
	return rows;
};

Array.prototype.createObjectsFrom2D = function () {
	const objects = [];
	this.forEach((row, rowY) => {
		row.forEach((symbol, symbolX) => {
			// Push a new Collision Block to the collisionBlocks Array
			if (symbol === 292 || symbol === 250) {
				objects.push(
					new CollisionBlock({
						position: {
							x: symbolX * 64,
							y: rowY * 64,
						},
					}),
				);
			}
		});
	});

	return objects;
};
