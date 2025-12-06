
export interface Resource {
    id: number;
    fileName: string;
    subject: string;
    uploader: string;
    date: string;
    type: string;
}

export interface Article {
    id: number;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    image: string;
    grade: string;
    subject: string;
    content: string;
}

export interface Teacher {
  id: number;
  name: string;
  title: string;
  subjects: string[];
  qualifications: string[];
  bio: string;
  email: string;
  phone: string;
  image: string;
}

export interface Student {
  id: number;
  name: string;
  grade: number;
  image: string;
  bio: string;
  email: string;
  phone: string;
  overallGrade: number;
  attendance: number;
  recentActivity: string;
  academicHistory: {
    term: string;
    records: {
      subject: string;
      teacher: string;
      grade: number;
    }[];
  }[];
  attendanceHistory: {
    date: string;
    status: 'Present' | 'Absent' | 'Late';
    notes?: string;
  }[];
  progressReports: {
    term: string;
    date: string;
    teacherComment: string;
    downloadUrl: string;
  }[];
  upcomingAssignments: {
    assignmentId: number;
    subject: string;
    title: string;
    dueDate: string;
  }[];
}

export interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface CurrentUser {
  id: number;
  name: string;
  role: string;
}
