from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Post(models.Model):
    TYPES = ('TECHNOLOGY', 'BIOLOGY', 'FINANCE')

    title = models.CharField(max_length=100, null=False)
    brief = models.TextField(null=False)
    type = models.CharField(
        max_length=6,
        choices=[(value, i) for i, value in enumerate(TYPES)]
    )

    posted_at = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        ''' On save, set timestamp '''
        if not self.posted_at:
            self.posted_at = timezone.now()
        return super(Post, self).save(*args, **kwargs)