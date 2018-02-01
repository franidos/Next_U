USE [Prueba]
GO

/****** Object:  Table [dbo].[Almacen]    Script Date: 31/01/2018 20:02:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
drop table [Almacen]
CREATE TABLE [dbo].[Almacen](
	[ID] [int]  NOT NULL primary key identity(1,1),
	[Nombre] [varchar](50) NULL,
	[Stock] [numeric](18, 0) NULL
) 
GO


