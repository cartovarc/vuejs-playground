new Vue({
	el: "#app",
	data: {
		my_message: "Hello World!",
		example_link: "http://www.google.com",
		html_code: "<a href='http://www.google.com'> Example link </a>",
		counter: 0,
		x: 0,
		y: 0
	},
	methods: {
		say_something: function () {
			return this.my_message;
		},
		hack_message: function () {
			this.my_message = "Hacked message :(";
			return "HACKED!";
		},
		increase_counter: function (increment) {
			this.counter = this.counter + increment;
		},
		update_coordinates: function (useless, event) {
			this.x = event.clientX;
			this.y = event.clientY;
		}
	}
});

