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
const Meetings_1 = require("./Meetings");
const Questions_1 = require("./Questions");
const AssessmentResponses_1 = require("./AssessmentResponses");
let SetQuestions = class SetQuestions extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SetQuestions.prototype, "id_set_questions", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Meetings_1.Meetings, (meetings) => meetings.questions, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_meetings' }),
    __metadata("design:type", Meetings_1.Meetings)
], SetQuestions.prototype, "meeting", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Questions_1.Questions, (questions) => questions.setQuestions, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_question' }),
    __metadata("design:type", Questions_1.Questions)
], SetQuestions.prototype, "questions", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => AssessmentResponses_1.AssessmentResponses, (assessmentResponses) => assessmentResponses.questions, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_assessment' }),
    __metadata("design:type", AssessmentResponses_1.AssessmentResponses)
], SetQuestions.prototype, "assessmentResponse", void 0);
SetQuestions = __decorate([
    typeorm_1.Entity({ name: 'set_questions' })
], SetQuestions);
exports.SetQuestions = SetQuestions;
//# sourceMappingURL=SetQuestions.js.map