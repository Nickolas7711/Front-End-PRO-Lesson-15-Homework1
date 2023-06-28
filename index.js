const roles = {
	admin: "./style/images/roles/admin.png",
	student: "./style/images/roles/student.png",
	lector: "./style/images/roles/lector.png"
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "./style/images/Users/JackSmith.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "./style/images/Users/AmalSmith.png",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "./style/images/Users/NoahSmith.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "./style/images/Users/CharlieSmith.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}
		]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "./style/images/Users/EmilySmith.png",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}
		]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "./style/images/Users/LeoSmith.png",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];

class User {
	constructor(name, age, img, role, courses) {
		this.name = name;
		this.age = age;
		this.img = img;
		this.role = role;
		this.courses = courses;
	}

	render() {
		return `
			<div class="user">
				<div class="user__info">
					<div class="user__info--data">
						<img src="${this.img}" alt="${this.name}" height="100">
						<div class="user__naming">
							<p>Name: <b>${this.name}</b></p>
							<p>Age: <b>${this.age}</b></p>
						</div>
					</div>
					<div class="user__info--role ${this.role}">
						<img src="${roles[this.role]}" alt="${this.role}" height="25">
						<p>${this.role}</p>
					</div>
				</div>
			${this.renderCourses()}
			</div>
		`;
	}

	renderCourses() {
		if (this.courses && this.courses.length > 0) {
			const coursesList = this.courses.map((course) => {
				const courseMark = course.mark || course.score;
				const markText = this.getGradeText(courseMark);

				return this.role === "student"
					? `<div class="user__courses--course ${this.role}">${course.title}: <span class="${markText}">${markText}</span></div>`
					: this.role === "admin"
					? `<div class="admin__info ${this.role}"><b>Title: ${course.title}</b> <br> <b>Admin's score: <span class="${markText}">${markText}</span></b> <br> <b>Lector: ${course.lector}</b></div>`
					: this.role === "lector"
					? `<div class="admin__info ${this.role}"><b>Title: ${course.title}</b> <br> <b>Lector's score: <span class="${markText}">${markText}</span></b> <br> <b>Average student's score: <span class="${this.getGradeText(course.studentsScore)}">${this.getGradeText(course.studentsScore)}</span></b></div>`
					: "";
			});

			return `<div class="user__courses">${coursesList.join("")}</div>`;
		}

		return "";
	}

	getGradeText(mark) {
		let grade = "";
		for (let key in gradation) {
			if (mark <= Number(key)) {
			grade = gradation[key];
			break;
			}
		}

		return grade;
	}
}

class Student extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}

	renderCourses() {
		let coursesList = super.renderCourses();

		if (coursesList) {
			return coursesList;
		}

		return '';
	}
}

class Lector extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}

	renderCourses() {
		let coursesList = super.renderCourses();

		if (coursesList) {
			return coursesList;
		}

		return '';
	}
}

class Admin extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}

	renderCourses() {
		let coursesList = super.renderCourses();

		if (coursesList) {
			return coursesList;
		}

		return '';
	}
}

const renderedUsers = users.map((user) => {
	const { name, age, img, role, courses } = user;

		const currentUser = role === "student"
			? new Student(name, age, img, role, courses)
			: role === "lector"
			? new Lector(name, age, img, role, courses)
			: role === "admin"
			? new Admin(name, age, img, role, courses)
			: null;

	return currentUser.render();
});

document.write(`<div class="users">${renderedUsers.join('')}</div>`);