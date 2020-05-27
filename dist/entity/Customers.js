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
const CustomerRepresentatives_1 = require("./CustomerRepresentatives");
const Jobs_1 = require("./Jobs");
let Customers = class Customers extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Customers.prototype, "id_customer", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], Customers.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        length: 200,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "mailing_address", void 0);
__decorate([
    typeorm_1.Column({
        length: 200,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "actual_address", void 0);
__decorate([
    typeorm_1.Column({
        length: 200,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({
        length: 200,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        length: 12,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "inn", void 0);
__decorate([
    typeorm_1.Column({
        length: 9,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "kpp", void 0);
__decorate([
    typeorm_1.Column({
        length: 45,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "bank", void 0);
__decorate([
    typeorm_1.Column({
        length: 9,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "bik", void 0);
__decorate([
    typeorm_1.Column({
        length: 45,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "correspondent_account", void 0);
__decorate([
    typeorm_1.Column({
        length: 45,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "checking_account", void 0);
__decorate([
    typeorm_1.Column({
        length: 255,
        nullable: true
    }),
    __metadata("design:type", String)
], Customers.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany((type) => CustomerRepresentatives_1.CustomerRepresentatives, (customerRepresentatives) => customerRepresentatives.customer, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Customers.prototype, "customerRepresentatives", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Jobs_1.Jobs, (jobs) => jobs.customer, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Customers.prototype, "jobs", void 0);
Customers = __decorate([
    typeorm_1.Entity({ name: 'customers' })
], Customers);
exports.Customers = Customers;
//# sourceMappingURL=Customers.js.map