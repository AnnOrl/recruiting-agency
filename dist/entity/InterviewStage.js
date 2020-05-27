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
const InterviewStageStatuses_1 = require("./InterviewStageStatuses");
const Interviews_1 = require("./Interviews");
let InterviewStage = class InterviewStage extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], InterviewStage.prototype, "id_interview_stage", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], InterviewStage.prototype, "stage_name", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => InterviewStageStatuses_1.InterviewStageStatuses, (interviewStageStatuses) => interviewStageStatuses.stages, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_interview_stage_status' }),
    __metadata("design:type", InterviewStageStatuses_1.InterviewStageStatuses)
], InterviewStage.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Interviews_1.Interviews, (interviews) => interviews.stage, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], InterviewStage.prototype, "interviews", void 0);
InterviewStage = __decorate([
    typeorm_1.Entity({ name: 'interview_stage' })
], InterviewStage);
exports.InterviewStage = InterviewStage;
//# sourceMappingURL=InterviewStage.js.map