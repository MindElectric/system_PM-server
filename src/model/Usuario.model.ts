import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Area from "./Area.model";
import Rol from "./Rol.model";
import Notification from "./Notifications.model";

@Table({
    tableName: 'usuario',
    timestamps: false
})
class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    declare username: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare password: string;

    @Column({
        type: DataType.TEXT
    })
    declare refresh_token: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    declare isActive: boolean;

    @ForeignKey(() => Area)
    @Column
    declare id_area: number;

    @BelongsTo(() => Area)
    area: Area;

    @ForeignKey(() => Rol)
    @Column
    declare id_rol: number;

    @BelongsTo(() => Rol)
    rol: Rol;

    @HasMany(() => Notification)
    notifications: Notification[];
}

export default Usuario;
