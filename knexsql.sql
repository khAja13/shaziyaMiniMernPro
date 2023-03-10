USE [mappedTable]
GO
/****** Object:  Table [dbo].[custAddres]    Script Date: 21-12-2022 10:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[custAddres](
	[custaddId] [int] IDENTITY(1,1) NOT NULL,
	[place] [varchar](50) NULL,
	[zipcode] [int] NULL,
	[customerId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[custaddId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 21-12-2022 10:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[customerId] [int] IDENTITY(1,1) NOT NULL,
	[cName] [varchar](50) NULL,
	[email] [varchar](20) NULL,
	[password] [varchar](20) NULL,
	[phone] [int] NULL,
	[Deleted] [bit] NULL,
 CONSTRAINT [PK__Customer__B611CB7DB8B09160] PRIMARY KEY CLUSTERED 
(
	[customerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrdersDetails]    Script Date: 21-12-2022 10:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrdersDetails](
	[oderId] [int] IDENTITY(1,1) NOT NULL,
	[oQty] [int] NULL,
	[invoice] [int] NULL,
	[customerId] [int] NULL,
	[productId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[oderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 21-12-2022 10:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[productId] [int] IDENTITY(1,1) NOT NULL,
	[pName] [varchar](50) NULL,
	[pModel] [varchar](20) NULL,
	[pdescp] [varchar](50) NULL,
	[pPrice] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[productId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[custAddres] ON 

INSERT [dbo].[custAddres] ([custaddId], [place], [zipcode], [customerId]) VALUES (1, N'usa', 2132, 1)
INSERT [dbo].[custAddres] ([custaddId], [place], [zipcode], [customerId]) VALUES (2, N'ind', 54434, 2)
INSERT [dbo].[custAddres] ([custaddId], [place], [zipcode], [customerId]) VALUES (3, N'aus', 2366, 2)
INSERT [dbo].[custAddres] ([custaddId], [place], [zipcode], [customerId]) VALUES (4, N'nes', 69453, 1)
INSERT [dbo].[custAddres] ([custaddId], [place], [zipcode], [customerId]) VALUES (5, N'jim', 94894, 3)
SET IDENTITY_INSERT [dbo].[custAddres] OFF
GO
SET IDENTITY_INSERT [dbo].[Customer] ON 

INSERT [dbo].[Customer] ([customerId], [cName], [email], [password], [phone], [Deleted]) VALUES (1, N'Tim', N'IND', N'21151', 545454545, NULL)
INSERT [dbo].[Customer] ([customerId], [cName], [email], [password], [phone], [Deleted]) VALUES (2, N'Jim', N'UAE', N'231346', 6565, NULL)
INSERT [dbo].[Customer] ([customerId], [cName], [email], [password], [phone], [Deleted]) VALUES (3, N'KIm', N'IN', N'54', 11511561, NULL)
SET IDENTITY_INSERT [dbo].[Customer] OFF
GO
SET IDENTITY_INSERT [dbo].[OrdersDetails] ON 

INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (1, 2, 555500, 1, 1)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (2, 8, 515151, 2, 1)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (3, 3, 52452, 4, 2)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (4, 2, 252445, 4, 3)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (5, 2, 4242542, 3, 2)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (6, 2, 351454, 3, 5)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (7, 2, 515151, 2, 3)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (8, 1, 1511, 1, 4)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (9, 23, 121515, 1, 1)
INSERT [dbo].[OrdersDetails] ([oderId], [oQty], [invoice], [customerId], [productId]) VALUES (10, 331, 5634, 2, 5)
SET IDENTITY_INSERT [dbo].[OrdersDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([productId], [pName], [pModel], [pdescp], [pPrice]) VALUES (1, N'ELectrics', N'516AS', N'assds sdsd', 51525)
INSERT [dbo].[Products] ([productId], [pName], [pModel], [pdescp], [pPrice]) VALUES (2, N'grogery', N'sa5cds', N'sak ashdkjsc', 654)
INSERT [dbo].[Products] ([productId], [pName], [pModel], [pdescp], [pPrice]) VALUES (3, N'moibile', N'cno45', N'asscjb laiscn', 251)
INSERT [dbo].[Products] ([productId], [pName], [pModel], [pdescp], [pPrice]) VALUES (4, N'watch', N'sdn555', N'askjh kasnjn', 21)
INSERT [dbo].[Products] ([productId], [pName], [pModel], [pdescp], [pPrice]) VALUES (5, N'Table', N'sdnii88', N'askhsc dc', 22)
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
ALTER TABLE [dbo].[custAddres]  WITH CHECK ADD  CONSTRAINT [FK_custAddres_custAddres] FOREIGN KEY([custaddId])
REFERENCES [dbo].[custAddres] ([custaddId])
GO
ALTER TABLE [dbo].[custAddres] CHECK CONSTRAINT [FK_custAddres_custAddres]
GO
ALTER TABLE [dbo].[OrdersDetails]  WITH CHECK ADD  CONSTRAINT [FK__OrdersDet__custo__4D94879B] FOREIGN KEY([customerId])
REFERENCES [dbo].[Customer] ([customerId])
GO
ALTER TABLE [dbo].[OrdersDetails] CHECK CONSTRAINT [FK__OrdersDet__custo__4D94879B]
GO
ALTER TABLE [dbo].[OrdersDetails]  WITH CHECK ADD FOREIGN KEY([productId])
REFERENCES [dbo].[Products] ([productId])
GO
