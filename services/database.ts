
import { mockStudents, mockTeachers, mockArticles, mockResources, mockNotifications } from '../data/mockData';
import { Student, Teacher, Article, Resource, Notification } from '../types';

const DB_KEY = 'itunaSchoolDB';

interface Database {
    students: Student[];
    teachers: Teacher[];
    articles: Article[];
    resources: Resource[];
    notifications: Notification[];
}

// Helper to get the database from localStorage
const getDB = (): Database => {
    try {
        const dbString = localStorage.getItem(DB_KEY);
        if (dbString) {
            return JSON.parse(dbString);
        }
    } catch (error) {
        console.error("Failed to parse database from localStorage", error);
    }
    // Return an empty structure if parsing fails or DB doesn't exist
    return { students: [], teachers: [], articles: [], resources: [], notifications: [] };
};

// Helper to save the database to localStorage
const saveDB = (db: Database) => {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    } catch (error) {
        console.error("Failed to save database to localStorage", error);
    }
};

// Initialize the database if it doesn't exist
export const initDB = () => {
    if (!localStorage.getItem(DB_KEY)) {
        const initialDB: Database = {
            students: mockStudents,
            teachers: mockTeachers,
            articles: mockArticles,
            resources: mockResources,
            notifications: mockNotifications,
        };
        saveDB(initialDB);
    }
};

// --- Student Functions ---
export const getStudents = (): Student[] => getDB().students;
export const getStudentById = (id: number): Student | undefined => getStudents().find(s => s.id === id);
export const updateStudent = (updatedStudent: Student): void => {
    const db = getDB();
    const studentIndex = db.students.findIndex(s => s.id === updatedStudent.id);
    if (studentIndex > -1) {
        db.students[studentIndex] = updatedStudent;
        saveDB(db);
    }
};

// --- Teacher Functions ---
export const getTeachers = (): Teacher[] => getDB().teachers;
export const getTeacherById = (id: number): Teacher | undefined => getTeachers().find(t => t.id === id);

// --- Article Functions ---
export const getArticles = (): Article[] => getDB().articles;
export const getArticleById = (id: number): Article | undefined => getArticles().find(a => a.id === id);

// --- Resource Functions ---
export const getResources = (): Resource[] => getDB().resources;
export const deleteResource = (id: number): void => {
    const db = getDB();
    db.resources = db.resources.filter(r => r.id !== id);
    saveDB(db);
};

// --- Notification Functions ---
export const getNotifications = (): Notification[] => getDB().notifications;
export const markAllNotificationsAsRead = (): void => {
    const db = getDB();
    db.notifications.forEach(n => n.read = true);
    saveDB(db);
};
