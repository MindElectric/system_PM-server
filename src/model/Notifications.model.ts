import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Usuario from "./Usuario.model";
import Material from "./Material.model";

@Table({
    tableName: 'notifications',
    timestamps: true,
    updatedAt: false
})
class Notification extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    declare type: string;

    @ForeignKey(() => Usuario)
    @Column
    declare user_id: number;

    @BelongsTo(() => Usuario)
    user: Usuario;

    @ForeignKey(() => Material)
    @Column
    declare material_id: number;

    @BelongsTo(() => Material)
    material: Material;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'createdat'
    })
    declare createdAt: Date;
}

export default Notification;