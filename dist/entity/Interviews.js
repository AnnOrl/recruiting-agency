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
const Recruiters_1 = require("./Recruiters");
const InterviewStage_1 = require("./InterviewStage");
const Meetings_1 = require("./Meetings");
let Interviews = class Interviews extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Interviews.prototype, "id_interviews", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => InterviewStage_1.InterviewStage, (interviewStages) => interviewStages.interviews, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_interview_stage' }),
    __metadata("design:type", InterviewStage_1.InterviewStage)
], Interviews.prototype, "stage", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Recruiters_1.Recruiters, (recruiters) => recruiters.interviews, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_recruiter' }),
    __metadata("design:type", Recruiters_1.Recruiters)
], Interviews.prototype, "recruiter", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Jobs_1.Jobs, (jobs) => jobs.interviews, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_job' }),
    __metadata("design:type", Jobs_1.Jobs)
], Interviews.prototype, "jobs", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Meetings_1.Meetings, (meetings) => meetings.interview, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Interviews.prototype, "meetings", void 0);
Interviews = __decorate([
    typeorm_1.Entity({ name: 'interviews' })
], Interviews);
exports.Interviews = Interviews;
//# sourceMappingURL=Interviews.js.map