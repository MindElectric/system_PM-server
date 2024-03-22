import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Area from "./Area.model";

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
        type: DataType.STRING(15),
        allowNull: false
    })
    rol: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    username: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    password: string;

    @ForeignKey(() => Area)
    @Column
    id_area: number;

    @BelongsTo(() => Area)
    area: Area;
}

export default Usuario;
