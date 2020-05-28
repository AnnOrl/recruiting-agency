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
const Customers_1 = require("./Customers");
const Grades_1 = require("./Grades");
const Recruiters_1 = require("./Recruiters");
const Interviews_1 = require("./Interviews");
const JobSkills_1 = require("./JobSkills");
const CustomerRepresentatives_1 = require("./CustomerRepresentatives");
let Jobs = class Jobs extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Jobs.prototype, "id_job", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], Jobs.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Customers_1.Customers, (customer) => customer.jobs, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_customer' }),
    __metadata("design:type", Customers_1.Customers)
], Jobs.prototype, "customer", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => CustomerRepresentatives_1.CustomerRepresentatives, (customerRepresentatives) => customerRepresentatives.jobs, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_customer_representatives' }),
    __metadata("design:type", CustomerRepresentatives_1.CustomerRepresentatives)
], Jobs.prototype, "customerRepresentatives", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Grades_1.Grades, (grade) => grade.jobs, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_grade' }),
    __metadata("design:type", Grades_1.Grades)
], Jobs.prototype, "grade", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Recruiters_1.Recruiters, (recruiters) => recruiters.jobs, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'id_recruiter' }),
    __metadata("design:type", Recruiters_1.Recruiters)
], Jobs.prototype, "recruiter", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Interviews_1.Interviews, (interviews) => interviews.jobs, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Jobs.prototype, "interviews", void 0);
__decorate([
    typeorm_1.OneToMany((type) => JobSkills_1.JobSkills, (jobSkills) => jobSkills.job, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Jobs.prototype, "jobSkills", void 0);
Jobs = __decorate([
    typeorm_1.Entity({ name: 'jobs' })
], Jobs);
exports.Jobs = Jobs;
//# sourceMappingURL=Jobs.js.map