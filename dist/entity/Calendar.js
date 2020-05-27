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
const Recruiters_1 = require("./Recruiters");
let Calendar = class Calendar extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Calendar.prototype, "id_calendar", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], Calendar.prototype, "date", void 0);
__decorate([
    typeorm_1.Column({
        length: 200
    }),
    __metadata("design:type", String)
], Calendar.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Meetings_1.Meetings, (meeting) => meeting.calendar, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_meeting' }),
    __metadata("design:type", Meetings_1.Meetings)
], Calendar.prototype, "meeting", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Recruiters_1.Recruiters, (recruiters) => recruiters.calendar, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_recruiter' }),
    __metadata("design:type", Recruiters_1.Recruiters)
], Calendar.prototype, "recruiter", void 0);
Calendar = __decorate([
    typeorm_1.Entity({ name: 'calendar' })
], Calendar);
exports.Calendar = Calendar;
//# sourceMappingURL=Calendar.js.map