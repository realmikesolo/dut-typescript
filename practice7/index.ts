enum StudentStatus {
  Active,
  Academic_Leave,
  Graduated,
  Expelled,
}

enum CourseType {
  Mandatory,
  Optional,
  Special,
}

enum Semester {
  First,
  Second,
}

enum Grade {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
}

enum Faculty {
  Computer_Science,
  Economics,
  Law,
  Engineering,
}

interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface StudentGrade {
  studentId: number;
  courseId: number;
  grade: Grade;
  date: Date;
  semester: Semester;
}

class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private grades: StudentGrade[] = [];
  private studentIdCounter: number = 1;
  private courseRegistrations: Map<number, number[]> = new Map();

  // Реєстрація нового студента
  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = { ...student, id: this.studentIdCounter++ };
    this.students.push(newStudent);
    return newStudent;
  }

  // Додавання курсу
  addCourse(course: Course): void {
    this.courses.push(course);
  }

  // Реєстрація студента на курс
  registerForCourse(studentId: number, courseId: number): void {
    const course = this.courses.find((c) => c.id === courseId);
    const student = this.students.find((s) => s.id === studentId);

    if (!course) {
      throw new Error("Курс не знайдено");
    }

    if (!student) {
      throw new Error("Студента не знайдено");
    }

    if (course.faculty !== student.faculty) {
      throw new Error("Студент не може записатися на курс іншого факультету");
    }

    const registeredStudents = this.courseRegistrations.get(courseId) ?? [];

    if (registeredStudents.length >= course.maxStudents) {
      throw new Error("Максимальна кількість студентів на курсі досягнута");
    }

    registeredStudents.push(studentId);
    this.courseRegistrations.set(courseId, registeredStudents);
  }

  // Встановлення оцінки студенту за курс
  setGrade(studentId: number, courseId: number, grade: Grade): void {
    const registeredStudents = this.courseRegistrations.get(courseId);

    if (!registeredStudents || !registeredStudents.includes(studentId)) {
      throw new Error("Студент не зареєстрований на цей курс");
    }

    const newGrade: StudentGrade = {
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: Semester.First, // Потрібно уточнити семестр
    };
    this.grades.push(newGrade);
  }

  // Оновлення статусу студента
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);

    if (!student) {
      throw new Error("Студента не знайдено");
    }

    if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) {
      throw new Error("Не можна змінити статус студента, який вже випустився або був відрахований");
    }

    student.status = newStatus;
  }

  // Отримання студентів по факультету
  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((student) => student.faculty === faculty);
  }

  // Отримання оцінок студента
  getStudentGrades(studentId: number): StudentGrade[] {
    return this.grades.filter((grade) => grade.studentId === studentId);
  }

  // Отримання доступних курсів по факультету і семестру
  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter((course) => course.faculty === faculty && course.semester === semester);
  }

  // Обчислення середнього балу студента
  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);

    if (studentGrades.length === 0) {
      throw new Error("Студент не має оцінок");
    }

    const total = studentGrades.reduce((sum, grade) => sum + grade.grade, 0);
    return total / studentGrades.length;
  }

  // Отримання списку відмінників по факультету
  getHonorsStudents(faculty: Faculty): Student[] {
    return this.students.filter((student) => {
      if (student.faculty !== faculty) {
        return false;
      }

      const studentGrades = this.getStudentGrades(student.id);
      return studentGrades.every((grade) => grade.grade === Grade.Excellent);
    });
  }
}

// Використання системи управління
const universitySystem = new UniversityManagementSystem();

// Додати студента
const newStudent = universitySystem.enrollStudent({
  fullName: "Іван Іваненко",
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date(),
  groupNumber: "CS101",
});

// Додати курс
const newCourse: Course = {
  id: 1,
  name: "Основи програмування",
  type: CourseType.Mandatory,
  credits: 5,
  semester: Semester.First,
  faculty: Faculty.Computer_Science,
  maxStudents: 30,
};
universitySystem.addCourse(newCourse);

// Реєстрація на курс
universitySystem.registerForCourse(newStudent.id, newCourse.id);

// Встановлення оцінки
universitySystem.setGrade(newStudent.id, newCourse.id, Grade.Excellent);

// Оновлення статусу студента
universitySystem.updateStudentStatus(newStudent.id, StudentStatus.Academic_Leave);

// Отримання студентів по факультету
const csStudents = universitySystem.getStudentsByFaculty(Faculty.Computer_Science);
console.log("Студенти факультету Computer Science:", csStudents);

// Отримання списку відмінників по факультету
const honorsStudents = universitySystem.getHonorsStudents(Faculty.Computer_Science);
console.log("Відмінники факультету Computer Science:", honorsStudents);
