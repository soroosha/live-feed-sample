# Generated by Django 2.2.12 on 2020-05-02 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_post_posted_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='posted_at',
            field=models.DateTimeField(null=True),
        ),
    ]
