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
const SetQuestions_1 = require("./SetQuestions");
let AssessmentResponses = class AssessmentResponses extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AssessmentResponses.prototype, "id_assessment_responses", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], AssessmentResponses.prototype, "assessment", void 0);
__decorate([
    typeorm_1.OneToMany((type) => SetQuestions_1.SetQuestions, (setQuestions) => setQuestions.assessmentResponse, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], AssessmentResponses.prototype, "questions", void 0);
AssessmentResponses = __decorate([
    typeorm_1.Entity({ name: 'assessment_responses' })
], AssessmentResponses);
exports.AssessmentResponses = AssessmentResponses;
//# sourceMappingURL=AssessmentResponses.js.map