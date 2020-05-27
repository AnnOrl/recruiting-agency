"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Jobs_1 = require("./Jobs");
const JobSeekers_1 = require("./JobSeekers");
let Grades = class Grades extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Grades.prototype, "id_grade", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], Grades.prototype, "grade_name", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Jobs_1.Jobs, (jobs) => jobs.grade, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Grades.prototype, "jobs", void 0);
__decorate([
    typeorm_1.OneToMany((type) => JobSeekers_1.JobSeekers, (jobSeekers) => jobSeekers.confirmedGrade, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Grades.prototype, "jobSeekersConfirmed", void 0);
__decorate([
    typeorm_1.OneToMany((type) => JobSeekers_1.JobSeekers, (jobSeekers) => jobSeekers.prevGrade, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Grades.prototype, "jobSeekersPrev", void 0);
Grades = __decorate([
    typeorm_1.Entity({ name: 'grades' })
], Grades);
exports.Grades = Grades;
//# sourceMappingURL=Grades.js.map