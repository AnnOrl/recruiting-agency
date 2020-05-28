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
const SeekersSkills_1 = require("./SeekersSkills");
const Grades_1 = require("./Grades");
let JobSeekers = class JobSeekers extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], JobSeekers.prototype, "id_job_seekers", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], JobSeekers.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], JobSeekers.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], JobSeekers.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'longblob' }),
    __metadata("design:type", Object)
], JobSeekers.prototype, "cv", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Grades_1.Grades, (grades) => grades.jobSeekersConfirmed, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_confirmed_grade' }),
    __metadata("design:type", Grades_1.Grades)
], JobSeekers.prototype, "confirmedGrade", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Grades_1.Grades, (grades) => grades.jobSeekersPrev, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_prev_grade' }),
    __metadata("design:type", Grades_1.Grades)
], JobSeekers.prototype, "prevGrade", void 0);
__decorate([
    typeorm_1.OneToMany((type) => SeekersSkills_1.SeekersSkills, (seekersSkills) => seekersSkills.jobSeekers, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], JobSeekers.prototype, "skills", void 0);
JobSeekers = __decorate([
    typeorm_1.Entity({ name: 'job_seekers' })
], JobSeekers);
exports.JobSeekers = JobSeekers;
//# sourceMappingURL=JobSeekers.js.map