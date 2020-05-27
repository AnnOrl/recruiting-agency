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
const Jobs_1 = require("./Jobs");
const RolesRecruiter_1 = require("./RolesRecruiter");
const Calendar_1 = require("./Calendar");
let Recruiters = class Recruiters extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Recruiters.prototype, "id_recruiter", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], Recruiters.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], Recruiters.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], Recruiters.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Jobs_1.Jobs, (jobs) => jobs.recruiter, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Recruiters.prototype, "jobs", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => RolesRecruiter_1.RolesRecruiter, (roles_recruiter) => roles_recruiter.recruiters, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_roles_recruiter' }),
    __metadata("design:type", RolesRecruiter_1.RolesRecruiter)
], Recruiters.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Interviews_1.Interviews, (interviews) => interviews.recruiter, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Recruiters.prototype, "interviews", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Calendar_1.Calendar, (calendar) => calendar.recruiter, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Recruiters.prototype, "calendar", void 0);
Recruiters = __decorate([
    typeorm_1.Entity({ name: 'recruiters' })
], Recruiters);
exports.Recruiters = Recruiters;
//# sourceMappingURL=Recruiters.js.map