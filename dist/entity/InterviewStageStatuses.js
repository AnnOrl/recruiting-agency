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
const InterviewStage_1 = require("./InterviewStage");
let InterviewStageStatuses = class InterviewStageStatuses extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], InterviewStageStatuses.prototype, "id_interview_stage_status", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], InterviewStageStatuses.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany((type) => InterviewStage_1.InterviewStage, (interviewStage) => interviewStage.status, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], InterviewStageStatuses.prototype, "stages", void 0);
InterviewStageStatuses = __decorate([
    typeorm_1.Entity({ name: 'interview_stage_statuses' })
], InterviewStageStatuses);
exports.InterviewStageStatuses = InterviewStageStatuses;
//# sourceMappingURL=InterviewStageStatuses.js.map