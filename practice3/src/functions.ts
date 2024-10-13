import { Professor, Lesson, ScheduleConflict, Classroom, Course, DayOfWeek, TimeSlot, CourseType } from "./types";

export const professors: Professor[] = [];
export const classrooms: Classroom[] = [];
export const courses: Course[] = [];
export let schedule: Lesson[] = [];

export function addProfessor(professor: Professor): void {
  professors.push(professor);
}

export function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  if (conflict) {
      console.error(`Conflict detected: ${conflict.type}`);
      return false;
  }
  schedule.push(lesson);
  return true;
}

function validateLesson(lesson: Lesson): ScheduleConflict | null {
  for (const existingLesson of schedule) {
      if (existingLesson.professorId === lesson.professorId && existingLesson.dayOfWeek === lesson.dayOfWeek && existingLesson.timeSlot === lesson.timeSlot) {
          return { type: "ProfessorConflict", lessonDetails: existingLesson };
      }
      if (existingLesson.classroomNumber === lesson.classroomNumber && existingLesson.dayOfWeek === lesson.dayOfWeek && existingLesson.timeSlot === lesson.timeSlot) {
          return { type: "ClassroomConflict", lessonDetails: existingLesson };
      }
  }
  return null;
}


export function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
  return classrooms.filter(classroom => {
      return !schedule.some(lesson => lesson.classroomNumber === classroom.number && lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot);
  }).map(classroom => classroom.number);
}

export function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter(lesson => lesson.professorId === professorId);
}


export function getClassroomUtilization(classroomNumber: string): number {
  const totalSlots = 5 * 5;
  const usedSlots = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
  return (usedSlots / totalSlots) * 100;
}

export function getMostPopularCourseType(): CourseType {
  const count: Record<CourseType, number> = { Lecture: 0, Seminar: 0, Lab: 0, Practice: 0 };
  courses.forEach(course => {
      count[course.type]++;
  });
  return (Object.keys(count) as CourseType[]).reduce((a, b) => count[a] > count[b] ? a : b) as CourseType;
}

export function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
  const lesson = schedule.find(l => l.courseId === lessonId);
  if (!lesson) {
      return false;
  }
  if (classrooms.some(c => c.number === newClassroomNumber)) {
      lesson.classroomNumber = newClassroomNumber;
      return true;
  }
  return false;
}

export function cancelLesson(lessonId: number): void {
  schedule = schedule.filter(lesson => lesson.courseId !== lessonId);
}
