let bump3Instance;

function loadBump() {
	return new Promise(resolve => {
		requirejs(['bump-3'], bump3 => {
			bump3Instance = bump3;
			resolve(bump3Instance);
		});
	});
}

function load() {
	if (bump3Instance) {
		return Promise.resolve(bump3Instance);
	}
	return loadBump();
}

exports.load = load;
