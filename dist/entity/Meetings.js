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
const Interviews_1 = require("./Interviews");
const SetQuestions_1 = require("./SetQuestions");
const Calendar_1 = require("./Calendar");
let Meetings = class Meetings extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Meetings.prototype, "id_meetings", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], Meetings.prototype, "date", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Interviews_1.Interviews, (interviews) => interviews.meetings, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_interview' }),
    __metadata("design:type", Interviews_1.Interviews)
], Meetings.prototype, "interview", void 0);
__decorate([
    typeorm_1.OneToMany((type) => SetQuestions_1.SetQuestions, (setQuestions) => setQuestions.meeting, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Meetings.prototype, "questions", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Calendar_1.Calendar, (calendar) => calendar.meeting, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Meetings.prototype, "calendar", void 0);
Meetings = __decorate([
    typeorm_1.Entity({ name: 'meetings' })
], Meetings);
exports.Meetings = Meetings;
//# sourceMappingURL=Meetings.js.map