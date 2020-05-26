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
let CustomerRepresentatives = class CustomerRepresentatives extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CustomerRepresentatives.prototype, "id_customer_representatives", void 0);
__decorate([
    typeorm_1.Column({
        length: 45
    }),
    __metadata("design:type", String)
], CustomerRepresentatives.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        length: 45,
        nullable: true
    }),
    __metadata("design:type", String)
], CustomerRepresentatives.prototype, "phone", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Customers_1.Customers, (customer) => customer.customerRepresentatives),
    __metadata("design:type", Customers_1.Customers)
], CustomerRepresentatives.prototype, "customer", void 0);
CustomerRepresentatives = __decorate([
    typeorm_1.Entity({ name: 'customer_representatives' })
], CustomerRepresentatives);
exports.CustomerRepresentatives = CustomerRepresentatives;
//# sourceMappingURL=CustomerRepresentatives.js.map