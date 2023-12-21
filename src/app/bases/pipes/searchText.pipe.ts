import { Pipe, PipeTransform } from '@angular/core';
import { StudentAttendance } from 'src/app/models/attendances/student-attendance.model';

@Pipe({
  name: 'SearchObject',
  standalone: true,
})
export class SearchObjectPipe implements PipeTransform {
  transform(students: StudentAttendance[], search = ''): StudentAttendance[] {
    if (!search.trim()) {
      return students;
    }

    return students.filter((st) => {
      return (
        st.Student.firstName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        st.Student.lastName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      );
    });
  }
}
