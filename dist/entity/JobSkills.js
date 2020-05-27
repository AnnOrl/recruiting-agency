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
const Skills_1 = require("./Skills");
const Jobs_1 = require("./Jobs");
let JobSkills = class JobSkills extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], JobSkills.prototype, "id_job_skills", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Skills_1.Skills, (skills) => skills.jobSkills, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_skill' }),
    __metadata("design:type", Skills_1.Skills)
], JobSkills.prototype, "skill", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Jobs_1.Jobs, (jobs) => jobs.jobSkills, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_job' }),
    __metadata("design:type", Skills_1.Skills)
], JobSkills.prototype, "job", void 0);
JobSkills = __decorate([
    typeorm_1.Entity({ name: 'job_skills' })
], JobSkills);
exports.JobSkills = JobSkills;
//# sourceMappingURL=JobSkills.js.map