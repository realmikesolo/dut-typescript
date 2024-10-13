import { addLesson, addProfessor, classrooms, courses, findAvailableClassrooms, getClassroomUtilization, getMostPopularCourseType, getProfessorSchedule } from "./functions";
import { Lesson } from "./types";

function main() {
  // Ініціалізація деяких професорів
  addProfessor({ id: 1, name: "Dr. Smith", department: "Mathematics" });
  addProfessor({ id: 2, name: "Dr. Johnson", department: "Physics" });

  // Ініціалізація класних кімнат
  classrooms.push({ number: "101A", capacity: 40, hasProjector: true });
  classrooms.push({ number: "101B", capacity: 30, hasProjector: false });

  // Ініціалізація курсів
  courses.push({ id: 101, name: "Calculus", type: "Lecture" });
  courses.push({ id: 102, name: "Physics I", type: "Lab" });

  // Спроба додати заняття
  const lesson1: Lesson = {
      courseId: 101,
      professorId: 1,
      classroomNumber: "101A",
      dayOfWeek: "Monday",
      timeSlot: "8:30-10:00"
  };

  const lesson2: Lesson = {
      courseId: 102,
      professorId: 2,
      classroomNumber: "101A",
      dayOfWeek: "Monday",
      timeSlot: "10:15-11:45"
  };

  console.log("Adding lesson 1:", addLesson(lesson1) ? "Success" : "Failed");
  console.log("Adding lesson 2:", addLesson(lesson2) ? "Success" : "Failed");

  // Додавання конфліктного заняття
  const conflictLesson: Lesson = {
      courseId: 101,
      professorId: 1,
      classroomNumber: "101A",
      dayOfWeek: "Monday",
      timeSlot: "8:30-10:00"
  };
  console.log("Adding conflicting lesson:", addLesson(conflictLesson) ? "Success" : "Failed");

  // Відображення розкладу професора
  console.log("Schedule for Professor 1:", getProfessorSchedule(1));

  // Пошук доступних аудиторій
  console.log("Available classrooms for Monday, 8:30-10:00:", findAvailableClassrooms("8:30-10:00", "Monday"));

  // Використання аудиторії
  console.log("Classroom 101A utilization:", getClassroomUtilization("101A"), "%");

  // Найпопулярніший тип курсу
  console.log("Most popular course type:", getMostPopularCourseType());
}

main();
